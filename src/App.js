import './App.css';
import {useState} from "react";
import "./App.css";
import React from "react";

const App = () => {


    const [text, setText] = useState('');
    // console.log(text);

    let masOfCezar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let [createdMas, setCreatedMas] = useState('');


    const shifter = (event) => {
        event.preventDefault();
        // console.log('length of letter', text.length);
        const noSpace = text.replace(/ /g, "");
        // console.log('input word:', noSpace);
        const numOfContainers = Math.ceil(noSpace.length / 16);
        // const numOfContainer = ((noSpace.length / 16));
        // const numOfContainers = Math.ceil(numOfContainer);
        // console.log('number of blocks', numOfContainers);


        let decrypted = [];


        for (let i = 1; i < (numOfContainers + 2); i++) {
            let last = ((i * 16) - 1);
            let first = (last - 15);
            // let first = i === 1 ? 1 : (i * 16);

            let mas = [];
            let masZec = [];
            let masZecSorted = [];


            for (let j = first; j <= last; j++) {
                //
                // console.log(first);
                // console.log(last);

                // mas.push(noSpace[j]);

                // console.log(noSpace[j].valueOf());
                let oneLetter = noSpace[j].valueOf();
                // console.log(oneLetter);
                let upperOne = oneLetter.toUpperCase();
                // console.log(upperOne);

                mas.push(upperOne);


                let cezLetter = masOfCezar.indexOf(upperOne.valueOf());
                // console.log(masOfCezar.indexOf(upperOne.valueOf()));
                masZec.push(cezLetter);


                // console.log(`sorted massive of cezar number ${i}`, newMasCez);


                masZecSorted = masZec.sort(function (a, b) {
                    return a - b
                });
            }


            // console.log('mas', mas);
            // console.log('masZec', masZec);
            // console.log(`sorted massive of cezar number ${i}`, masZecSorted);

            // console.log('decrypted', decrypted);


            decrypted.push(...masZecSorted);

            setCreatedMas(decrypted);


        }


    }

    const inpRef = React.createRef();


    const onClear = () => {
        setText('')
        setCreatedMas('')
        inpRef.current.value ='';
    }

    const txt = text.replace(/[^a-zA-Z]+/g, '');

    // const txt = text.replace(/\s/g, '', /$/g );

    return (
        <div className={'mainDiv'}>

            <div className={'header'}>
                <h1>
                    Cezar`s code
                </h1>
            </div>

            <div className={'main'}>

                <form
                    // onSubmit={shifter}
                >

                    <input
                        ref={inpRef}
                        type={"text"}
                        // type={"password"}
                        onChange={(event) => setText(event.target.value.replace(/[^a-zA-Z]+/g, ''))}
                        style={{fontSize: 30}}
                    />

                    <button
                        className={'myBtn'}
                        type={"submit"}
                        onClick={shifter}
                        disabled={
                        // text.length !== 16 ||
                            !txt.length ||
                             !Number.isInteger(txt.length/16)
                    }
                    >
                        Encrypt
                    </button>

                    <button
                        className={'clearBtn'}
                        onClick={onClear}
                        disabled={text.length===0}
                    >
                        Clear
                    </button>
                </form>

                <div>
                    {
                        !txt.length || !Number.isInteger(txt.length/16) ? (
                            <div className={'shifred'}>
                                    <div>Input 16 letters</div>
                                <div>Need to input {16-txt.length%16} more letters</div>
                                <div>
                                    {txt.length > 0 ? <div>Or delete {txt.length%16} more letters</div> : <div>{" "}</div>}
                                </div>
                            </div>
                        ):(
                            <div className={'shifred'}>
                                    All right
                            </div>
                        )
                    }
                </div>


                <div className={'shifred'}>
                    {
                        createdMas ? (
                            <div>
                                {
                                    createdMas.map(value => value)
                                }
                            </div>
                        ) : (
                            <div>
                                <b style={{color: "red"}}>Warning: </b> into codding containing only letters, other symbols - not containing!
                            </div>
                        )
                    }
                </div>

                <div  className={'footer'} >
                </div>

            </div>
        </div>
    );
}

export default App;
