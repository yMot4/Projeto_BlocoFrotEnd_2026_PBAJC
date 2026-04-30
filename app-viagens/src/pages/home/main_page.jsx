import "./main_page.css"
import Card from "../../components/Card/Card.jsx"
import SearchForm from "../../components/SearchForm/SearchForm.jsx"
import CarrocelSlide from "../../components/Carroceis/CarrocelSlide/CarrocelSlide.jsx"

function Home() {
    return (
        <>
            <div className="tela">
                <div className="foto_background"></div>
                <SearchForm />
                <div className="painel_verde">
                    <CarrocelSlide titulo="titulo" maxItens='10' />
                </div>
            </div>
        </>
    );
}

export default Home;
