import React, { Component } from 'react'

export default class Timer extends Component {
    state = {
        minutes: 1,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval);
                    document.getElementById('hdnActualInput').disabled = true;
                    document.getElementById('cover-spin').style.display = 'block';
                    return this.props.onTimerFinished();
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                {minutes === 0 && seconds === 0
                    ? <h1 class="timer">0.00</h1>
                    : <h1 class="timer">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}