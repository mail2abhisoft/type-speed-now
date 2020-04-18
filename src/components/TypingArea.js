import React, { Component, Fragment } from "react";
import Timer from "./Timer";
import data from '../data/data.json'

let mainStr = "";
const delay = ms => new Promise(res => setTimeout(res, ms));

class TypingArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTypeStarted: false, // timer starts, if type started
            finalTypedString: [] // from this string, calculate result(netWPM, grossWPM, keystrokes etc)
        };
    }

    componentWillMount() {
        mainStr = data[Math.floor(Math.random() * 10)]; // assign random string from data.json
        this.extractTextToBeShownInTypeArea(mainStr); // extract next portion of mainStr, if completed
    }

    componentDidMount() {
        document.getElementById('hdnActualInput').focus();
    }

    extractTextToBeShownInTypeArea(str) {
        let count = 1; // upto 4 lines allowed in the typing portion
        let tempArr = []; // store max 46 character in this array, once reach reset to []
        let partStrToBeShown = ""; // decide how much word to be shown in the typing area
        str.split(' ').map(word => {
            if (count <= 4) {
                tempArr.push(word + " ");
                if (tempArr.join('').length <= 46)
                    partStrToBeShown = partStrToBeShown + word + " ";
                else {
                    tempArr = [];
                    count++;
                    if (count <= 4) {
                        tempArr.push(word + " ");
                        partStrToBeShown = partStrToBeShown + word + " ";
                    }
                }
            }
        });
        this.setState({
            lastTypedIndex: partStrToBeShown.length, // it helps to check condition whether typed index is reached with this index or not, if yes then call extractTextToBeShownInTypeArea(str)
            fromIndex: this.state.fromIndex === undefined ? partStrToBeShown.length : this.state.fromIndex + partStrToBeShown.length, // it helps to extract next portion of the string to be shown in typing area
            typedString: partStrToBeShown,
            toBeTypedStr: <span><span style={{ background: 'black', color: '#fff' }}>{partStrToBeShown.substring(0, 1)}</span>{partStrToBeShown.substring(1, partStrToBeShown.length - 1)}</span>, // typed string to be render in typing portion
        });
    }

    onChange = e => {
        const typedStrArr = e.currentTarget.value.split(''); // get the value from hidden(text) field and make it an array
        typedStrArr.map((ch, index) => { // this iteration makes each character as 'green' or 'red' as per the match
            typedStrArr[index] = (ch == this.state.typedString[index]) ? <span style={{ color: 'green' }}>{this.state.typedString[index]}</span> : this.state.typedString[index] === " " ? <span style={{ background: 'red' }}>{this.state.typedString[index]}</span> : <span style={{ color: 'red' }}>{this.state.typedString[index]}</span>;
        });
        this.setState({
            currentTypedText: e.currentTarget.value, // to check below if condition
            isTypeStarted: true, // for enabling timer
            toBeTypedStr: <span>{typedStrArr}<span style={{ background: 'black', color: '#fff' }}>{this.state.typedString.substring(parseInt(e.currentTarget.value.length - 1) + 1, parseInt(e.currentTarget.value.length - 1) + 2)}</span>{this.state.typedString.substring(parseInt(e.currentTarget.value.length - 1) + 2, this.state.typedString.length - 1)}</span>,
        }, () => {
            if (this.state.currentTypedText.length === this.state.lastTypedIndex) { // check if typed portion completed
                this.setState({
                    finalTypedString: [...this.state.finalTypedString, this.state.toBeTypedStr.props.children[0]], // join the newly typed string to finalTypedString
                    toBeTypedStr: ''
                }, () => {
                    document.getElementById('hdnActualInput').value = '';
                    this.extractTextToBeShownInTypeArea(mainStr.substring(this.state.fromIndex, mainStr.length - 1));
                });
            }
        });
    };

    // for reset and fetch random string to the typing area
    refreshPage = e => {
        window.location.reload(false);
    }

    // do the final calculation once timer finished
    onTimerFinished = async () => {
        await delay(1000); // intentionally keep loader for 1 sec
        let arr = [];
        if (this.state.isTypeStarted)
            arr = this.state.finalTypedString[0];

        if (this.state.toBeTypedStr != '')
            arr = arr !== undefined ? arr.concat(this.state.toBeTypedStr.props.children[0]) : this.state.toBeTypedStr.props.children[0];

        let correctStrokes = 0;
        let wrongStrokes = 0;
        let correctWords = 0;
        let wrongWords = 0;
        let tempArr = [];

        arr.map(item => {
            if (item.props.style.color === 'green') {
                correctStrokes++;
                tempArr.push(item.props.style.color);
            } else {
                wrongStrokes++;
                tempArr.push(item.props.style.color);
            }
            if (item.props.children === " ") {
                if (tempArr.indexOf("red") === -1) {
                    correctWords++;
                    tempArr = [];
                } else {
                    wrongWords++;
                    tempArr = [];
                }
            }
        });

        this.setState({
            totalStrokes: (correctStrokes + wrongStrokes),
            correctStrokes, wrongStrokes, correctWords, wrongWords,
            grossWPM: (correctStrokes + wrongStrokes) / 5,
            netWPM: [(correctStrokes + wrongStrokes) / 5] - wrongWords,
        }, () => document.getElementById('cover-spin').style.display = 'none')
    }

    render() {
        const {
            onChange, refreshPage,
            state: { toBeTypedStr, totalStrokes, correctStrokes, wrongStrokes, correctWords, wrongWords, grossWPM, netWPM }
        } = this;

        return (
            <Fragment>
                <div style={{ display: 'flex' }}>
                    <input id="hdnActualInput" onChange={onChange} ref={(ip) => this.hdnVal = ip} className="hidden" />  {/* actual  typing area */}
                    <div onClick={() => { this.hdnVal.focus() }} className="typing-area">{toBeTypedStr}</div> {/* portion of text of mainStr to be shown */}

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {this.state.isTypeStarted ? <Timer onTimerFinished={() => this.onTimerFinished()} /> : <h1 class="timer">1:00</h1>}
                        <div onClick={refreshPage} class="reset">RESET</div>
                    </div>
                </div>
                {totalStrokes !== undefined ? <div className="col-xs-12 col-md-3" style={{ margin: '1.5%' }}>
                    <div className="card">
                        <div class="card-header">Result</div>
                        <div class="net-speed">{parseInt(netWPM)} WPM</div>
                        <div class="net-speed-bottom-label">(words per minute)</div>
                        <div className="row card-up-section">
                            <div className="col-xs-8 col-md-8">
                                <div class="card-up-sec-item"><span>Keystrokes</span><span className='card-up-sec-right-item'>(<span style={{ color: 'green' }}>{correctStrokes}</span> | <span style={{ color: 'red' }}>{wrongStrokes}</span>) {totalStrokes}</span></div>
                                <div class="card-up-sec-item"><span>Accuracy</span><span className='card-up-sec-right-item'><b>{((netWPM / grossWPM) * 100).toFixed(1)}%</b></span></div>
                                <div class="card-up-sec-item"><span>Correct Words</span><span className='card-up-sec-right-item'><b style={{ color: 'green' }}>{correctWords}</b></span></div>
                                <div class="card-up-sec-item"><span>Wrong Words</span><span className='card-up-sec-right-item'><b style={{ color: 'red' }}>{wrongWords}</b></span></div>
                            </div>
                        </div>
                    </div>
                </div> : ""}
            </Fragment>
        );
    }
}

export default TypingArea;