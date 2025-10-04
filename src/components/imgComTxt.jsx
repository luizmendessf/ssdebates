import './imgComTxt.css'

export default function ImgComTxt(props){
return( 
<section className="imgcomtxt">

    <div className="texto-imgtxt">
        <h1>{props.title}</h1>
        {props.txt.split('\n').map((linha, index) => (
            <p key={index}>{linha}</p>
        ))}
    </div>

    <div className="img-imgtxt">
        <img src={props.img} alt={props.title} />
    </div>


</section>
);
}




