import "./main_page.css"
import SearchForm from "../../components/SearchForm/SearchForm.jsx"
import ApiStatus from "../../components/ApiStatus/ApiStatus.jsx"
import UserBadge from "../../components/UserBadge/UserBadge.jsx"
import CarrosselSlide from "../../components/Carrosseis/CarrosselSlide/CarrosselSlide.jsx"

function Home() {
    return (
        <>
            <div className="tela">
                <div className="foto_background"></div>
                <ApiStatus />
                <UserBadge />
                <SearchForm />
                <div className="painel_verde">
                    <CarrosselSlide titulo="titulo" maxItens='10' />
                </div>
            </div>
        </>
    );
}

export default Home;
