import './logo-spinner.styles.scss';
import './blink-animations.styles.scss';

interface Props{
    size: string,
    pulseSpeed: number
}

const LogoSpinner = ({size, pulseSpeed}: Props) => {

    const blinkers = [1,2,3,4,5,6,7,8];

    return(
        //height is fixed via aspect ratio
        <div className={"parent"} style={{width: `${size}`}}>
            {
                blinkers.map(blinker => {
                return <div key={blinker} className={`blinker oval oval-${blinker}`} />
                })
            }
            {
                blinkers.map(blinker => {
                return <div key={blinker} className={`blinker circle circle-${blinker}`} />
                })
            }
        </div>
    )
}

export default LogoSpinner
