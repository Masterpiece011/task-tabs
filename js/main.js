"use strict"

const allTabsIds = []
let pickedTabsIds = [0]

const continueBtn = document.querySelector(".js-continue-btn")
const allTabsElems = document.querySelectorAll(".js-tabs-item")
const allCurrentTabListElems = document.querySelectorAll(".js-current-tab-list")
const progressBarElem = document.querySelector(".js-progress-bar")

function refreshProgressBar(countPickedTabs) {
    if (countPickedTabs > (allTabsIds.length / 2)) {
        progressBarElem.style.backgroundColor = "#ffd43f" 
    }
    if (countPickedTabs === allTabsIds.length) {
        progressBarElem.style.backgroundColor = "#73BE43" 
    }
    progressBarElem.style.width = countPickedTabs * (1000 / allTabsIds.length) + "px"
}

function isReadyToContinue() {
    if (pickedTabsIds.length == allTabsIds.length) {
        continueBtn.classList.add("active")
        continueBtn.removeAttribute("disabled")
    } 
}

function showCurrentList(idActiveTab) {
    allCurrentTabListElems[idActiveTab].classList.add("active")
}

function refreshTabs() {
    allTabsElems.forEach(tab => {
        tab.classList.remove("active")
    })
    allCurrentTabListElems.forEach(list => {
        list.classList.remove("active")
    })
}

function calculateCurrentTabId() {
    let activeTabId = 0
    allTabsElems.forEach((tab, i) => {
        if (tab.classList.contains("active")) {
            if (!pickedTabsIds.includes(i)) {
                pickedTabsIds.push(i)
            }
            activeTabId = i
        }
    })
    return activeTabId
}

allTabsElems.forEach((tab, tabId) => {
    allTabsIds.push(tabId)
    tab.addEventListener("click", () => {
        refreshTabs()
        tab.classList.add("active")
        let tabId = calculateCurrentTabId()
        refreshProgressBar(pickedTabsIds.length)
        showCurrentList(tabId)
        isReadyToContinue()
    })
})

progressBarElem.style.width = (1000 / allTabsIds.length) + "px"



