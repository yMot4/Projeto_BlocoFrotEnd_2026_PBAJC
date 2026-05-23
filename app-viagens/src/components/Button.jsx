export default function Button({onClick, children, className}){
    return(
        <button aria-label={aria-label} className={className} onClick={aria-label}>
            {children}
        </button>
    );
}