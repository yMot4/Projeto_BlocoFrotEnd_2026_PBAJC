import styles from "./SearchForm.module.css";
import {Plane, Group, User, Calendar} from "@boxicons/react";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const API_BASE = "https://travelagencyapi-a5zb.onrender.com/api/v1";
const DEBOUNCE_MS = 250;
const MIN_QUERY_LEN = 2;

function AirportField({label, placeholder, iconFlip, value, onSelect}) {
    const [query, setQuery] = useState(value?.label ?? "");
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);
    const debounceRef = useRef(null);
    const abortRef = useRef(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (abortRef.current) abortRef.current.abort();

        const trimmed = query.trim();
        if (trimmed.length < MIN_QUERY_LEN) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        debounceRef.current = setTimeout(async () => {
            const controller = new AbortController();
            abortRef.current = controller;
            try {
                const res = await fetch(
                    `${API_BASE}/airports/search?q=${encodeURIComponent(trimmed)}`,
                    {signal: controller.signal},
                );
                if (!res.ok) throw new Error(res.status);
                const data = await res.json();
                setSuggestions(data);
            } catch (err) {
                if (err.name !== "AbortError") setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => clearTimeout(debounceRef.current);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePick = (airport) => {
        onSelect(airport);
        setQuery(`${airport.cidade} (${airport.iata})`);
        setOpen(false);
    };

    return (
        <div className={styles.fieldWrapper} ref={wrapperRef}>
            <div className={styles.row}>
                <Plane className={`${styles.icon} ${iconFlip ? styles.iconFlip : ""}`}/>
                <input
                    className={styles.input}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                        onSelect(null);
                    }}
                    onFocus={() => setOpen(true)}
                    aria-label={label}
                    autoComplete="off"
                />
            </div>
            {open && query.trim().length >= MIN_QUERY_LEN && (
                <ul className={styles.suggestions}>
                    {loading && <li className={styles.suggestionEmpty}>Buscando...</li>}
                    {!loading && suggestions.length === 0 && (
                        <li className={styles.suggestionEmpty}>Nenhum aeroporto encontrado</li>
                    )}
                    {!loading &&
                        suggestions.map((a) => (
                            <li
                                key={a.iata}
                                className={styles.suggestionItem}
                                onMouseDown={() => handlePick(a)}
                            >
                                <span className={styles.suggestionIata}>{a.iata}</span>
                                <span className={styles.suggestionMain}>
                  {a.cidade}
                                    {a.pais ? `, ${a.pais}` : ""}
                </span>
                                <span className={styles.suggestionSub}>{a.nome}</span>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

function formatPtDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    if (!y || !m || !d) return "";
    return `${d}/${m}/${y}`;
}

function DateField({id, label, value, onChange, min}) {
    const inputRef = useRef(null);
    const display = formatPtDate(value);

    const openPicker = () => {
        const el = inputRef.current;
        if (!el) return;
        if (typeof el.showPicker === "function") el.showPicker();
        else el.focus();
    };

    return (
        <div
            className={styles.pill}
            onClick={openPicker}
            role="button"
            tabIndex={-1}
        >
            <label htmlFor={id} className={styles.pill_label}>
                {label}
            </label>
            <div className={styles.dateWrapper}>
                <Calendar className={styles.dateIcon}/>
                <span className={display ? styles.dateValue : styles.datePlaceholder}>
          {display || "dd/mm/aaaa"}
        </span>
                <input
                    id={id}
                    ref={inputRef}
                    type="date"
                    className={styles.dateNative}
                    value={value}
                    min={min}
                    onChange={(e) => onChange(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    );
}

export default function SearchForm() {
    const navigate = useNavigate();
    const [origem, setOrigem] = useState(null);
    const [destino, setDestino] = useState(null);
    const [dataIda, setDataIda] = useState("");
    const [dataVolta, setDataVolta] = useState("");
    const [adultos, setAdultos] = useState(1);
    const [criancas, setCriancas] = useState(0);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const canSearch =
        origem?.iata &&
        destino?.iata &&
        origem.iata !== destino.iata &&
        dataIda &&
        (!dataVolta || dataVolta >= dataIda) &&
        adultos >= 1;

    const handleSearch = async () => {
        if (!canSearch || searching) return;
        setSearching(true);
        setSearchError(null);

        const apiQs = new URLSearchParams({
            Origem: origem.iata,
            Destino: destino.iata,
            DataIda: dataIda,
            Adultos: String(adultos),
            Criancas: String(criancas),
        });
        if (dataVolta) apiQs.set("DataVolta", dataVolta);

        const navQs = new URLSearchParams({
            origem: origem.iata,
            destino: destino.iata,
            dataIda,
            adultos: String(adultos),
            criancas: String(criancas),
        });
        if (dataVolta) navQs.set("dataVolta", dataVolta);

        try {
            const res = await fetch(
                `${API_BASE}/travel-tickets/search?${apiQs.toString()}`,
            );
            if (!res.ok) throw new Error(`Erro na API: ${res.status}`);
            const results = await res.json();
            navigate(`/passagens?${navQs.toString()}`, {state: {results}});
        } catch (err) {
            setSearchError(err.message || "Falha ao buscar passagens.");
            setSearching(false);
        }
    };

    return (
        <div className={styles.container}>
            <AirportField
                label="Cidade de partida"
                placeholder="Cidade de partida"
                value={origem}
                onSelect={setOrigem}
            />

            <div className={styles.divider}/>

            <AirportField
                label="Cidade de destino"
                placeholder="Cidade de destino"
                iconFlip
                value={destino}
                onSelect={setDestino}
            />

            <div className={styles.divider}/>

            <div className={styles.rowBottom}>
                <DateField
                    id="dataIda"
                    label="Data partida"
                    value={dataIda}
                    onChange={setDataIda}
                />
                <div className={styles.pillDivider}/>
                <DateField
                    id="dataVolta"
                    label="Data retorno"
                    value={dataVolta}
                    onChange={setDataVolta}
                    min={dataIda || undefined}
                />
            </div>

            <div className={styles.divider}/>

            <div className={styles.rowBottom}>
                <div className={styles.pill_viajantes}>
                    <User className={styles.icon}/>
                    <label htmlFor="adultos" className={styles.viajantes_label}>
                        Adultos
                    </label>
                    <select
                        id="adultos"
                        className={styles.select}
                        value={adultos}
                        onChange={(e) => setAdultos(Number(e.target.value))}
                    >
                        {Array.from({length: 9}, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.pillDivider}/>
                <div className={styles.pill_viajantes}>
                    <Group className={styles.icon}/>
                    <label htmlFor="criancas" className={styles.viajantes_label}>
                        Crianças
                    </label>
                    <select
                        id="criancas"
                        className={styles.select}
                        value={criancas}
                        onChange={(e) => setCriancas(Number(e.target.value))}
                    >
                        {Array.from({length: 10}, (_, i) => i).map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.divider}/>

            <button
                type="button"
                className={styles.button}
                disabled={!canSearch || searching}
                onClick={handleSearch}
            >
                {searching ? (
                    <span className={styles.buttonLoading}>
            <span className={styles.spinner} aria-hidden="true"/>
            Buscando passagens...
          </span>
                ) : (
                    "Pesquisar"
                )}
            </button>

            {searchError && <p className={styles.errorMessage}>{searchError}</p>}
        </div>
    );
}
