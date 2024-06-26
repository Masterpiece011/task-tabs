"use strict"

const allTabsIds = []
let pickedTabsIds = [1]

const continueBtn = document.querySelector(".js-continue-btn")
const allTabsElems = document.querySelectorAll(".js-tabs-item")
const allCurrentTabListElems = document.querySelectorAll(".js-current-tab-list")
const progressBarElem = document.querySelector(".js-progress-bar")

progressBarElem.style.width = 250 +"px"

function refreshProgressBar(countPickedTabs) {
    if (countPickedTabs === 3) {
        progressBarElem.style.backgroundColor = "#ffd43f" 
    }
    if (countPickedTabs === 4) {
        progressBarElem.style.backgroundColor = "#73BE43" 
    }
    progressBarElem.style.width = countPickedTabs * 250 + "px"
}

function isReadyToContinue() {
    if (pickedTabsIds.length == allTabsIds.length) {
        continueBtn.classList.add("active")
        continueBtn.removeAttribute("disabled")
    } 
}

function showCurrentList(id) {
    allCurrentTabListElems.forEach(list => {
        if (list.dataset.id == id) {
            list.classList.add('active')
        }   
    })
}

function isCurrentTab() {
    allTabsElems.forEach(tab => {
        tab.classList.remove("active")
    })
    allCurrentTabListElems.forEach(list => {
        list.classList.remove("active")
    })
}

allTabsElems.forEach(tab => {
    allTabsIds.push(Number(tab.dataset.id));
    tab.addEventListener("click", () => {
        if (!pickedTabsIds.includes(Number(tab.dataset.id))) {
            pickedTabsIds.push(Number(tab.dataset.id))
        }
        console.log("pickedTabsIds", pickedTabsIds);
        refreshProgressBar(pickedTabsIds.length)
        isCurrentTab()
        showCurrentList(tab.dataset.id)
        isReadyToContinue()
        tab.classList.add("active")
    })
})



