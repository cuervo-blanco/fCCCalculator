import React from "react";
import * as math from 'mathjs';


class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: "0",
            firstValue: null,
            secondValue: null,
            operation: false,
            currentDigit: null,
            result: null,
            decimal: false
        };
    
    } 


    clearDisplay = () => {
        this.setState({
            displayValue: "0",
            firstValue: null
        })
    }

    inputDigit = (digit, type) => {
    
        if (this.state.displayValue === "0") {
            if (type === "number") {
                this.setState({
                    displayValue: digit.toString(),
                    currentDigit: "number"
                });
            } else if (type === "operator") {
                if (digit !== "-") {
                    this.setState({
                        displayValue: "0",
                        currentDigit: "operator"
                    });
                } else {
                    this.setState({
                        displayValue: digit.toString(),
                        currentDigit: "operator"
                    });
                }
            } else if (type === "decimal") {
                this.setState({
                    displayValue: "0.",
                    currentDigit: "decimal"
                });
            }
        } else if (this.state.displayValue === "-" && type === "operator" && digit !== "-") {
            this.setState({
                displayValue: "0",
                currentDigit: "operator"
            });
        } 
        else if (this.state.displayValue !== "0") {
            if (type === "number") {
                this.setState({
                    displayValue: this.state.displayValue + digit.toString(),
                    currentDigit: "number"
                });
            } else if (type === "operator") {
                if (this.state.currentDigit === "number") {
                    this.setState({
                        displayValue: this.state.displayValue + digit.toString(),
                        currentDigit: "operator",
                        decimal: false
                    });
                } else if (this.state.currentDigit === "operator") {
                    this.setState({
                        displayValue: this.state.displayValue.slice(0, -1) + digit.toString(),
                        currentDigit: "operator",
                        decimal: false
                    });
                }
            } else if (type === "decimal" && this.state.decimal === false) {
                if (this.state.currentDigit === "number") {
                    this.setState({
                        displayValue: this.state.displayValue + digit.toString(),
                        currentDigit: "decimal",
                        decimal: true
                    });
                } else if (this.state.currentDigit === "operator") {
                    this.setState({
                        displayValue: this.state.displayValue + "0" + digit.toString(),
                        currentDigit: "decimal",
                        decimal: true
                    });
                } else if (this.state.currentDigit === "decimal") {
                    this.setState({
                        displayValue: this.state.displayValue,
                        currentDigit: "decimal",
                        decimal: true
                    });
                }
            } else if (type === "decimal" && this.state.decimal === true) {
                this.setState({
                    displayValue: this.state.displayValue,
                    currentDigit: "number"
                });
            }
        }
        
    }

    equals = () => {
        let result = math.evaluate(this.state.displayValue);
        this.setState({
            displayValue: result.toString()
        });
    }
       
    
    render() {
        

        return (
            <div id="calculator">
                <div id="display">{this.state.displayValue}</div>

                <button id="clear" onClick={this.clearDisplay}>AC</button>

                <button id="divide" className="operator" onClick={()=>{this.inputDigit("/", "operator")}}>÷</button>
                <button id="multiply" className="operator" onClick={()=>{this.inputDigit("*", "operator")}}>×</button>
                <button id="add" className="operator" onClick={()=>{this.inputDigit("+", "operator")}}>+</button>
                <button id="substract" className="operator" onClick={()=>{this.inputDigit("-", "operator")}}>-</button>
                <button id="equals" onClick={this.equals}>=</button>
                
                <button id="decimal" className="number" onClick={()=>{this.inputDigit(".", "decimal")}}>.</button>
                
                <button id="zero" className="number" onClick={()=>{this.inputDigit(0, "number")}}>0</button>
                <button id="one" className="number" onClick={()=>{this.inputDigit(1, "number")}}>1</button>
                <button id="two" className="number" onClick={()=>{this.inputDigit(2, "number")}}>2</button>
                <button id="three" className="number" onClick={()=>{this.inputDigit(3, "number")}}>3</button>
                <button id="four" className="number"  onClick={()=>{this.inputDigit(4, "number")}}>4</button>
                <button id="five" className="number" onClick={()=>{this.inputDigit(5, "number")}} >5</button>
                <button id="six" className="number" onClick={()=>{this.inputDigit(6, "number")}}>6</button>
                <button id="seven" className="number" onClick={()=>{this.inputDigit(7, "number")}}>7</button>
                <button id="eight" className="number" onClick={()=>{this.inputDigit(8, "number")}}>8</button>
                <button id="nine" className="number" onClick={()=>{this.inputDigit(9, "number")}}>9</button>

                
                

                
                


                
            </div>
        );
    }

}

export default Calculator;