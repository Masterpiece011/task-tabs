"use strict"
const maxWidth = 1000
const allTabsIds = []
let pickedTabsIds = [0]

const allTabsLists = document.querySelectorAll(".js-tabs-list")
console.log(allTabsLists);

const continueBtn = document.querySelector(".js-continue-btn")
const allTabsElems = document.querySelectorAll(".js-tabs-item")
const allCurrentTabListElems = document.querySelectorAll(".js-current-tab-list")
const progressBarElem = document.querySelector(".js-progress-bar")

allTabsLists.forEach(item => {
    item.addEventListener("click", () => {
        getCurrentTabsList()
        if (!item.classList.contains("active")) {
            item.classList.add("active")
        }
    })
})

function getCurrentTabsList() {
    allTabsLists.forEach(item => {
        item.classList.remove("active")
})}

function refreshProgressBar(countPickedTabs, countAllTabs) {
    let bgColor = ""
    if (countPickedTabs > (countAllTabs / 2)) {
        bgColor = "#ffd43f"
    }
    if (countPickedTabs === countAllTabs) {
        bgColor = "#73BE43"
    }
    progressBarElem.style.backgroundColor = bgColor

    progressBarElem.style.width = countPickedTabs * (maxWidth / countAllTabs) + "px"
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
        refreshProgressBar(pickedTabsIds.length, allTabsIds.length)
        showCurrentList(tabId)
        isReadyToContinue()
    })
})

progressBarElem.style.width = (1000 / allTabsIds.length) + "px"



