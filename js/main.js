var validTags = ["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","time","title","tr","track","u","ul","var","video","wbr", ">", "~"];

var submitBtn = document.getElementById("submitBtn");
var clearBtn = document.getElementById("clearBtn");
var solution = document.getElementById("solution");
var space = " ";

submitBtn.addEventListener("click", splitString, false);
document.getElementById("userInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        submitBtn.click();
    }
});
clearBtn.addEventListener("click", function() {
		solution.innerHTML = "";
	}, false);

function splitString() {
  var userInput = document.getElementById("userInput").value;
  var arrayOfStrings = userInput.split(space);
  interpretSelector(arrayOfStrings);
};

var interpretedArray = [];
var tempArray = [];
var indexArray = [];
var childNum = "";
var counter = 0;

function interpretSelector(selectorArray) {
		for(var i = 0; i < selectorArray.length; i++) {
			//class selectors
			if(selectorArray[i][0] == ".") {
				selectorArray[i] = selectorArray[i].slice(1);
				if(selectorArray[i].includes(":nth-child") == true) {
					tempArray = selectorArray[i].split(":nth-child(");
					if(selectorArray[i][1].length <= 2){
						if(selectorArray[i][1][0] == 1) {
							childNum = "1st";
						}
						else if(selectorArray[i][1][0] == 2) {
							childNum = "2nd";
						}
						else if(selectorArray[i][1][0] == 3) {
							childNum = "3rd";
						}
						else {
							childNum = selectorArray[i][1][0] + "th";
						}
					}
					else {
						childNum = selectorArray[i][1].slice(0,selectorArray[i][1].length-1) + "th";
					}
					interpretedArray.push("any element with the class of '" + tempArray[0] + "' <span class='child'>which is the " + childNum + " child of its parent</span> ");
					tempArray = [];
				}
				else {
				interpretedArray.push("any element with the class of '" + selectorArray[i] + "'")
				}
			}
			//id selectors
			else if(selectorArray[i][0] == "#") {
				selectorArray[i] = selectorArray[i].slice(1);
				interpretedArray.push("the element with the ID of '" + selectorArray[i] + "'")
			}
			else {
				//more specific class selectors
				if(selectorArray[i].includes(".") == true) {
					tempArray = selectorArray[i].split(".");
					if(validTags.indexOf(tempArray[0].toLowerCase()) > -1) {
						var concatenation = "any " + tempArray[0].toLowerCase() + " element ";
						for(var j = 1; j < tempArray.length; j++) {
							if(tempArray[j].includes(":nth-child") == true) {
								tempArray[j] = tempArray[j].split(":nth-child(");
								if(tempArray[j][1].length <= 2){
									if(tempArray[j][1][0] == 1) {
										childNum = "1st";
									}
									else if(tempArray[j][1][0] == 2) {
										childNum = "2nd";
									}
									else if(tempArray[j][1][0] == 3) {
										childNum = "3rd";
									}
									else {
										childNum = tempArray[j][1][0] + "th";
									}
								}
								else {
									childNum = tempArray[j][1].slice(0,tempArray[j][1].length-1) + "th";
								}
								tempArray[j] = tempArray[j][0] + " <span class='child'>which is the " + childNum + " child of its parent</span> ";
							}
							else if(tempArray[j].includes(":first-child") == true) {
								tempArray[j] = tempArray[j].split(":first-child");
								tempArray[j] = tempArray[j][0] + " <span class='child'>which is the first child of its parent</span> ";
							}
							else if(tempArray[j].includes(":last-child") == true) {
								tempArray[j] = tempArray[j].split(":last-child");
								tempArray[j] = tempArray[j][0] + " <span class='child'>which is the last child of its parent</span> ";
							}
							concatenation = concatenation + "with the class of '" + tempArray[j] + "' ";
						}
						interpretedArray.push(concatenation);
						concatenation = "";
						tempArray = [];
					}
					else {
						alert("Either you've entered an invalid selector or this selector is too complicated for me!");
						interpretedArray = [];
						tempArray = [];
						return
					}
				}
				//more specific id selectors
				else if(selectorArray[i].includes("#") == true) {
					tempArray = selectorArray[i].split("#");
					if(validTags.indexOf(tempArray[0].toLowerCase()) > -1) {
						var concatenation = "the " + tempArray[0].toLowerCase() + " element ";
						for(var k = 1; k < tempArray.length; k++) {
							concatenation = concatenation + "with the ID of '" + tempArray[k] + "'";
						}
						interpretedArray.push(concatenation);
						concatenation = "";
						tempArray = [];
					}
					else {
						alert("Either you've entered an invalid selector or this selector is too complicated for me!");
						interpretedArray = [];
						tempArray = [];
						return
					}
				}
				// type selectors
				else if(selectorArray[i].includes(":nth-child") == true) {
					selectorArray[i] = selectorArray[i].split(":nth-child("); 
					if(selectorArray[i][1].length <= 2){
						if(selectorArray[i][1][0] == 1) {
							childNum = "1st";
						}
						else if(selectorArray[i][1][0] == 2) {
							childNum = "2nd";
						}
						else if(selectorArray[i][1][0] == 3) {
							childNum = "3rd";
						}
						else {
							childNum = selectorArray[i][1][0] + "th";
						}
					}
					else {
						childNum = selectorArray[i][1].slice(0,selectorArray[i][1].length-1) + "th";
					}
					interpretedArray.push("any " + selectorArray[i][0] + " element <span class='child'>which is the " + childNum + " child of its parent</span> ");
				}
				else if(selectorArray[i].includes(":first-child") == true) {
					selectorArray[i] = selectorArray[i].split(":first-child"); 
					interpretedArray.push("any " + selectorArray[i][0] + " element <span class='child'>which is the first child of its parent</span> ");
				}
				else if(selectorArray[i].includes(":last-child") == true) {
					selectorArray[i] = selectorArray[i].split(":last-child"); 
					interpretedArray.push("any " + selectorArray[i][0] + " element <span class='child'>which is the last child of its parent</span> ");
				}
				else if(validTags.indexOf(selectorArray[i].toLowerCase()) > -1) {
					interpretedArray.push("any " + selectorArray[i].toLowerCase() + " element ")
				}
				else {
					alert("Either you've entered an invalid selector or this selector is too complicated for me!");
						interpretedArray = [];
					return
				}
			}
		}
	interpretedArray.reverse();
	stringifiedArray = JSON.stringify(interpretedArray);
	stringifiedArray = stringifiedArray.replace(stringifiedArray[2],stringifiedArray[2].toUpperCase());
	replacedString = stringifiedArray.split(',"any > element ",').join("<span class='directChild'> which is the direct child of </span>");
	replacedString = replacedString.split(',"any ~ element ",').join(" <span class='sibling'>which is the sibling of</span> ");
	for(var i=0; i < validTags.length; i++) {
		replacedString = replacedString.split("any " + validTags[i] + " element").join("<span class='tag'>any " + validTags[i] + " element</span> ");
		replacedString = replacedString.split("Any " + validTags[i] + " element").join("<span class='tag'>Any " + validTags[i] + " element</span> ");
		replacedString = replacedString.split(validTags[i] + " element with the ID of ").join(" <span class='id'>" + validTags[i] + " element with the ID of</span> ");
	}
	replacedString = replacedString.split(" with the class of ").join("<span class='class'> with the class of</span> ");
	replacedString = replacedString.split(",").join(" <span class='inside'>which is inside of</span> ");
	finishedString = replacedString.split("[").join("");
	finishedString = finishedString.split("]").join("");
	finishedString = finishedString.split("\"").join("");
	finishedString = finishedString.trim() + ".";
	solution.innerHTML = finishedString;
	interpretedArray = [];
	childNum = [];
};

