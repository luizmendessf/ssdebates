import './opcoes.css';

export default function Opcoes({children, isSelected, ...props}){
    return(
    <>
        <button className={isSelected ? "active" : undefined} {...props}>{children}</button>
    </>
    );
}