import { putRecored } from "../../api/kinesis";


export default function Test() {

    async function click() {

        const data = await putRecored();
        console.log(data);
    }

    return (
        <div>
            <button onClick={click}>test</button>
        </div>
    );
}
