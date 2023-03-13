
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import { useEffect, useState } from 'react';

export default function PubSubManager() {

    const AWS_REGION = 'ap-northeast-1';
    const ENDPOINT = 'xxxxxxxxxxxx-ats.iot.ap-northeast-1.amazonaws.com';
    const TOPIC = 'my_topic';
    const [message, setMessage] = useState('...');

    useEffect(() => {

        Amplify.addPluggable(new AWSIoTProvider({
            aws_pubsub_region: AWS_REGION,
            aws_pubsub_endpoint: `wss://${ENDPOINT}/mqtt`,
            clientId: 'my_client_id'
        }));

        PubSub.subscribe(TOPIC).subscribe({
            next: data => {
                console.log(data.value.message)
                this.items = [...this.items, { 'message': data.value.message }];
            },
            error: error => console.error(error),
            close: () => console.log('Done'),
        });

    }, []);

    return (
        <div>{message}</div>
    );
}
