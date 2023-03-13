import Clock from "../../components/clock";
import PubSubManager from "../../components/pubsub";

export default function Test() {

    return (
        <div>
            {/** 
             * <Clock sec={2}/>
            */}
            <PubSubManager />
        </div>
    );
}
