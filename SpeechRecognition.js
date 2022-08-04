const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription("7e216866b7b044fe963494935f9abbe3", "centralus");
speechConfig.speechRecognitionLanguage = "en-US";

function fromFile(audioFile, res) {
    let audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

     speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                res.send(`RECOGNIZED: Text=${result.text}`);
                break;
            case sdk.ResultReason.NoMatch:
                res.send("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                res.send(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    //res.send(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    res.send(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    //console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}

module.exports = fromFile;