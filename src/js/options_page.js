function loadOptionFromLocalStorage(key, defaultValue) {
    /*
    load setting from localStorage, if undefined, set default value to storage and use it
    */

    var val = localStorage[key];
    if (val == undefined) {
        val = localStorage[key] = defaultValue;
    }
    return val;
}

function loadOptions() {
    /*
    load setting from Chrome localStorage to UI
    */

    var currentDict = loadOptionFromLocalStorage("dictionary", 'en-vi');
    var status = loadOptionFromLocalStorage("enableLookup", true);

    var select = document.getElementById("dictionary");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == currentDict) {
            child.selected = "true";
            break;
        }
    }

    var statusRadio = document.getElementsByName("status");
    //alert(status);
    for (var i = 0; i < statusRadio.length; i++) {
        if (statusRadio[i].value == status) {
            statusRadio[i].checked = true;
            break;
        }
    }


    select.addEventListener("change", function (e) {
        saveOptions();
    });

    for (var i = 0; i < statusRadio.length; i++) {
        statusRadio[i].addEventListener("change", function (e) {
            saveOptions();
        });
    }
}

function saveOptions() {
    /*
    save all UI setting to Chrome localStorage
    */

    var select = document.getElementById("dictionary");
    var dictionary = select.children[select.selectedIndex].value;
    localStorage["dictionary"] = dictionary;

    var statusRadio = document.getElementsByName("status");
    for (var i = 0; i < statusRadio.length; i++) {
        if (statusRadio[i].checked) {
            localStorage["enableLookup"] = statusRadio[i].value;
            break;
        }
    }

    //    console.log("save options", dictionary, statusRadio[i].value);
}


$(document).ready(function () {
    loadOptions();
    _InitI18nForPage(
        [
            { elementId: 'lblMainHeading', resourceKey: 'name' },
            { elementId: 'lblMainDesc', resourceKey: 'description' },
            { elementId: 'lblSelectDictionary', resourceKey: 'lblSelectDictionary' },
            { elementId: 'lblStatus', resourceKey: 'lblStatus' }
        ]
    );
});