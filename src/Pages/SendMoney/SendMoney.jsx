import { useParams } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";


const SendMoney = () => {
    const {id} = useParams()
    const [,userData] = useUserData(id)

    console.log(userData);
    console.log(id)

    const handler = (e) => {
        e.preventDefault()
        const input = e.target.form.pin.value
        console.log(input);
    }

    return (
        <div>
            This is ur id {id}
            <form onClick={handler} action="">
                <input name="pin" type="text" placeholder="pin"/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default SendMoney;