
let color = "#000000";
let write = false;
let gridded = false;
const labelForSize = document.querySelector(".labelForSize")
const lableForMain = document.querySelector(".labelForMain")
const main = document.getElementById("main");

//function preventBehavior(e) {
//   e.preventDefault();
//}

//document.addEventListener("touchmove", preventBehavior, { passive: false });
main.addEventListener("pointerleave", () => {
    write = false;
});

function gridCreator(num) {
    main.setAttribute("style", `grid-template-columns: repeat(${num}, 1fr);`)
}

function boxAdder(startnum, targnum, border) {
    for (let i = startnum ** 2; i != targnum ** 2; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.addEventListener("pointerenter", () => {
            if (write === true) {
                box.setAttribute("style", `background-color: ${color};`);
            }
        })
        box.addEventListener("pointerdown", (e) => {
            write = true;
            e.preventDefault()
            box.setAttribute("style", `background-color: ${color};`);
        })
        box.addEventListener("pointerup", () => {
            write = false;
        })
        main.appendChild(box);
        const btn = document.querySelector(".btn")
        btn.addEventListener("click", () => {
            rainbowWrite = false
            color = "#000000";
        })
        const btn2 = document.querySelector(".btn2")
        btn2.addEventListener("click", () => {
            rainbowWrite = false
            color = "transparent";
        })
        const chooseColor = document.querySelector(".chooseColor")
        chooseColor.addEventListener("input", () => {
            rainbowWrite = false
            color = `${chooseColor.value}`;
        })
        chooseColor.addEventListener("click", () => {
            color = `${chooseColor.value}`;
            rainbowWrite = false
        })

        const ersall = document.querySelector(".ersall")
        ersall.addEventListener("click", () => {
            box.setAttribute("style", "background-color: none;")
        })

        if (border === true) {
            box.classList.add("colorbox")
        }

        box.addEventListener("mouseenter", randomColor)

    }

}

let rainbowWrite = false;
const rainbowColor = document.querySelector(".rainbow")
rainbowColor.addEventListener("pointerdown", () => {
    rainbowWrite = true;
})

const randomColor = () => {
    if (rainbowWrite === true) {
        let ranRed = Math.floor(Math.random() * 256)
        let ranGreen = Math.floor(Math.random() * 256)
        let ranBlue = Math.floor(Math.random() * 256)
        color = `rgb(${ranRed},${ranGreen},${ranBlue})`
    }
}


// main.addEventListener("pointerup" , () => {
//     rainbowWrite = false
// })

// main.addEventListener("mouseout" , () => {
//     rainbowWrite = false
// })


const borderbtn = document.querySelector(".borderbtn")
borderbtn.addEventListener("click", () => {
    gridded = !gridded
    const boxes = document.querySelectorAll(".box")
    for (let i = 0; i != boxes.length; i++) {
        let box = boxes[i]
        box.classList.toggle("colorbox")
    }
})

const borderColorPicker = document.querySelector(".bordercolor")
borderColorPicker.addEventListener("input", () => {
    const boxes = document.querySelectorAll(".box")
    for (let i = 0; i != boxes.length; i++) {
        let box = boxes[i]
        document.documentElement.setAttribute("style", `--border-color: ${borderColorPicker.value}`)
    }
})


const chooseFillColor = document.querySelector(".chooseFillColor")
chooseFillColor.addEventListener("input", () => {
    main.style.backgroundColor = chooseFillColor.value
})



function boxRemover(startnum, targnum) {
    for (let i = startnum ** 2; i != targnum ** 2; i--) {
        const box = document.querySelector(".box")
        main.removeChild(box);
    }
}

const sizeSlider = document.querySelector(".sizeSlider")
let sizeSliderInInt = parseInt(sizeSlider.value)
let oldSliderValue = sizeSliderInInt

sizeSlider.addEventListener("input", () => {
    labelForSize.textContent = `You select ${sizeSlider.value} x ${sizeSlider.value}`
})


let lastCol;
const colorHistory = document.querySelector(".colorHistory")
const chooseColor = document.querySelector(".chooseColor")
main.addEventListener("click", () => {
    if (lastCol != chooseColor.value) {
        const colors = document.createElement("li")
        colors.innerHTML = chooseColor.value
        colorHistory.appendChild(colors)
        lastCol = chooseColor.value
        colors.style.color = `${chooseColor.value}`
        colors.style.fontWeight = 700;
    }
})

// main.addEventListener("")

const clearHistory = document.querySelector(".clearHistory")
clearHistory.addEventListener("click", () => {
    colorHistory.innerHTML = ""
})

const applyBtn = document.querySelector(".apply")
applyBtn.addEventListener("click", () => {
    sizeSliderInInt = parseInt(sizeSlider.value)
    if (oldSliderValue > sizeSliderInInt) {
        boxRemover(oldSliderValue, sizeSliderInInt)
    } else {
        boxAdder(oldSliderValue, sizeSlider.value, gridded)
    }
    main.style.gridTemplateColumns = `repeat(${sizeSlider.value}, 1fr)`
    labelForSize.textContent = `You have selected ${sizeSlider.value} x ${sizeSlider.value}`
    lableForMain.textContent = `current size is ${sizeSlider.value} x ${sizeSlider.value}`

    const boxes = document.querySelectorAll(".box")
    for (let i = 0; i != boxes.length; i++) {
        let box = boxes[i];
        box.setAttribute("style", "background-color: none;")
    }
    oldSliderValue = sizeSlider.value
})

//need to fix color history bug with click and goind oute side of the main and shit
//need to make histry scrollable 
//need to make all comment fix
//neeed to fix titles


gridCreator(sizeSlider.value)
boxAdder(0, sizeSlider.value)
labelForSize.textContent = `current size is ${sizeSlider.value} x ${sizeSlider.value}`
lableForMain.textContent = `current size is ${sizeSlider.value} x ${sizeSlider.value}`