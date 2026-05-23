export default function Button({ariaLabel, onClick, children, className}){
    return(
        <button aria-label={ariaLabel} className={className} onClick={onClick}>
            {children}
        </button>
    );
}
