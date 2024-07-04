"use strict"
const maxWidth = 1000
const allTabsIds = []
let pickedTabsIds = []

let currentContents = []
let currentTabs = []

const allTabsWrappers = document.querySelectorAll(".js-tab")

const continueBtn = document.querySelector(".js-continue-btn")
const allTabsElems = document.querySelectorAll(".js-tabs-item")
const progressBarElem = document.querySelector(".js-progress-bar")

function changeActiveTab() {
    currentTabs.forEach((tab) => {
        tab.classList.remove("active")
    })
}

function getActiveTab(allTabs) {
    let activeTabId = 0
    allTabs.forEach((tab, i) => {
        if (tab.classList.contains("active")) {
            activeTabId = i
        }
    })
    return activeTabId
}

function changeActiveContent(activeTabId, contents) {
    contents.forEach((contents, i) => {
        if (activeTabId == i) {
            contents.classList.add("active")
        } else {
            contents.classList.remove("active")
        }
    })
}

function removeAcitveTabsClass() {
    allTabsWrappers.forEach(item => {
        item.classList.remove("active")
    })
}

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

function isPickedTab() {
    allTabsElems.forEach((tab, tabId) => {
        if (tab.classList.contains("active") && !pickedTabsIds.includes(tabId)) {
            pickedTabsIds.push(tabId)
        }
    })
}

allTabsWrappers.forEach(item => {
    item.addEventListener("mouseover", () => {
        if (!item.classList.contains("active")) {
            removeAcitveTabsClass()
            item.classList.add("active")
            currentContents = item.querySelectorAll(".js-current-tab-list")
            currentTabs = item.querySelectorAll(".js-tabs-item")
        }
    })
})

allTabsElems.forEach((tab, tabId) => {
    allTabsIds.push(tabId)
    isPickedTab()
    tab.addEventListener("click", () => {
        changeActiveTab()
        tab.classList.add("active")
        
        let tabId = getActiveTab(currentTabs)

        changeActiveContent(tabId, currentContents)
        if (pickedTabsIds.length !== allTabsElems.length) {
            isPickedTab()
        }
        refreshProgressBar(pickedTabsIds.length, allTabsElems.length)
        isReadyToContinue()
    })
})

progressBarElem.style.width = pickedTabsIds.length * (maxWidth / allTabsIds.length) + "px"