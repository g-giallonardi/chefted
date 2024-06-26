import { fetchEventSource } from "@microsoft/fetch-event-source";

import {useState} from 'react';

const useSse = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    let messageBuffer = "";
    let intervalId = null

    const messageHandler = (event) => {
        const chunk = event.data
        messageBuffer += chunk.replace(/^$/,'\n').replaceAll('"', '');
    }

    const formatMessage = (messageString, complete = false) => {
        const messageLines = messageString.split('\n');
        const lastLine = messageLines.pop();
        const remainingLine = complete ? null : lastLine;
        if (complete) {
            messageLines.push(lastLine);
        }
        return [messageLines, remainingLine];
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
                            messageBuffer = incompleteLine
                        }, 1000);
                    } else  {
                        setError('Erreur lors de l\'envoie de votre message');
                        setIsLoading(false);
                        console.log("Client side error ", res);
                    }
                },
                onmessage: messageHandler,
                onclose() {
                    console.log("Connection closed by the server");
                    clearInterval(intervalId)
                    const [ blocks, incompleteLine ] = formatMessage(messageBuffer, true)
                    setData(blocks);
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
        setError,
        data,
        execute, // to avoid infinite calls when inside a `useEffect`
    };
}

export default useSse;