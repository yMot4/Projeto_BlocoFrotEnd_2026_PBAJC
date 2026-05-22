export default function Button({onClick, children, style}){
    return(
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
}