import "./main_page.css"
import Card from "../../components/Card/Card.jsx"
import SearchForm from "../../components/SearchForm/SearchForm.jsx"

function Home() {
    return (
        <>
            <div className="tela">
                <div className="foto_background"></div>
                <SearchForm />
                <div className="painel_verde">
                    <Card
                        imagem="Munique.jpg"
                        titulo="Munique, Alemanha"
                        iconePredio="icone-hotel.png"
                        subtitulo="Munich Marriott Hotel"
                        iconeEstrela={"icone-estrela.png"}
                        pontuacao={4.8}
                        iconeAdicionar={"icone-plus.png"}
                        iconeCar={"icone-car.png"}
                        iconePlaca={"icone-placa.png"}
                        valor={"R$2.458"} />
                </div>
            </div>
        </>
    );
}

export default Home;
