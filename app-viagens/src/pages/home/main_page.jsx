import "./main_page.css"
import SearchForm from "../../components/SearchForm/SearchForm.jsx"
import CarrosselSlide from "../../components/Carrosseis/CarrosselSlide/CarrosselSlide.jsx"

function Home() {
    return (
        <>
            <div className="tela">
                <div className="foto_background"></div>
                <SearchForm />
                <div className="painel_verde">
                    <CarrosselSlide titulo="titulo" maxItens='10' />
                </div>
            </div>
        </>
    );
}

export default Home;
