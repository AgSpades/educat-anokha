export interface AgentMessageResponse {
    response?: string;
    message?: string;
    content?: string;
}

export const sendMessageToAgent = async (userId: string, message: string, retries = 3, delay = 1000): Promise<string> => {
    for (let i = 0; i < retries; i++) {
        try {
            // const response = await fetch('https://educat.saumyajit.dev/agent/message', {
            const response = await fetch('http://localhost:8000/agent/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    message: message
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                let errorMessage = `Network response was not ok: ${response.status} ${response.statusText}`;
                try {
                    const jsonError = JSON.parse(errorData);
                    if (jsonError.detail) {
                        errorMessage = jsonError.detail;
                    } else {
                        errorMessage = `Server Error: ${JSON.stringify(jsonError)}`;
                    }
                } catch (e) {
                    errorMessage = `Server Error: ${errorData}`;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            const aiText = data.response || data.message || data.content || JSON.stringify(data);
            return aiText;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === retries - 1) {
                console.error('All retries failed.');
                throw error;
            }
            // Wait before next retry
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Failed to send message after retries");
};

export const parseResume = async (userId: string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`http://localhost:8000/agent/resume/parse?user_id=${userId}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to parse resume: ${response.status} ${response.statusText} - ${errorData}`);
    }

    return await response.json();
};

export const recommendJobs = async (userId: string, limit: number = 5): Promise<any> => {
    const response = await fetch('http://localhost:8000/agent/jobs/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            limit: limit
        }),
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to get job recommendations: ${response.status} ${response.statusText} - ${errorData}`);
    }

    return await response.json();
};
