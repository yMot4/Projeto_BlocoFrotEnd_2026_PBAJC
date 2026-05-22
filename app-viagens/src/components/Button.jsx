export default function Button({onClick, children, className}){
    return(
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}