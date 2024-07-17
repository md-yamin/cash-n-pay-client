import { useParams } from "react-router-dom";

const TransactionManagement = () => {

    const {id} = useParams()

    return (
        <div>
            <h2>This is the id {id}</h2>
        </div>
    );
};

export default TransactionManagement;