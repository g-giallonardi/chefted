import { fetchEventSource } from "@microsoft/fetch-event-source";

import {useState} from 'react';

const useSse = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    let messageBuffer = "";
    let intervalId = null

    const messageHandler = (event) => {
        console.info('EVENT', event)
        const chunk = event.data
        messageBuffer += chunk.replaceAll('"', '');
    }

    const formatMessage = (stringData, complete = false) => {
        const lines = stringData.replaceAll('\\n','\n')
            .replaceAll('\n','.')
            .replaceAll('..','.')
            .split('.')

        const lastLine = lines.pop()

        let blocks = []
        const nbPackedLine = (max) => Math.floor(Math.random() * (max-1)) + 1
        let start = 0
        while (start < lines.length) {
            const end = start + nbPackedLine(lines.length - start);
            blocks.push(lines.slice(start, end).join('.'));
            start = end;
        }

        if(complete) {
            blocks.push(lastLine)
            return [ blocks, null ]
        }else{
            return [ blocks, lastLine ]
        }
    }

    const execute = async (method, endpoint, requestData = null) => {
        try {
            setData([]);
            messageBuffer = ''
            const headers = {};
            headers["Accept"] = "text/event-stream";

            if (requestData) headers['Content-Type'] = 'application/json';

            await fetchEventSource(endpoint,
                {
                openWhenHidden: true,
                method: method,
                headers: headers,
                body: requestData ? JSON.stringify(requestData) : null,
                onopen(res) {
                    messageBuffer = ''

                    if (res.ok && res.status === 200) {
                        setIsLoading(true);
                        intervalId = setInterval(() => {
                            const [ blocks, incompleteLine ] = formatMessage(messageBuffer)
                            setData(blocks);
                            console.info('buffer', messageBuffer)
                            console.info('blocks', blocks)
                            messageBuffer = incompleteLine
                        }, 1000);

                        console.log("Connection made ", res);
                    } else if (
                        res.status >= 400 &&
                        res.status < 500 &&
                        res.status !== 429
                    ) {
                        setIsLoading(false);
                        console.log("Client side error ", res);
                    }
                },
                onmessage: messageHandler,
                onclose() {
                    console.log("Connection closed by the server");
                    clearInterval(intervalId)
                    console.info('buffer', messageBuffer)
                    const [ blocks, incompleteLine ] = formatMessage(messageBuffer, true)
                    setData(blocks);
                    console.info('blocks', blocks)
                    setIsLoading(false);

                },
                onerror(err) {
                    console.error("There was an error from server", err);
                    setError(err);
                    setIsLoading(false);
                    throw err;
                },
            });
        } catch (e) {
            setError(e);
            setIsLoading(false);
            throw e;
        }
    }

    return {
        isLoading,
        error,
        data,
        execute, // to avoid infinite calls when inside a `useEffect`
    };
}

export default useSse;