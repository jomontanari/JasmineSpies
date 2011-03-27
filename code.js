var Toggleable = function(element) {

    this.toggle = function() {
        if (currentlyVisible()) {
            hide();
        } else {
            show();
        }
    }



    function currentlyVisible() {
        return element.css("display") === "block";
    }

    function show() {
        element.show();
    }

    function hide() {
        element.hide();
    }

}

var DataContainer = function(element) {

	this.loadData = function() {
		$.ajax({
			url: 'http://postposttechnical.com/',
			context: document.body,
			success: putDataInElement
		});
	}

	function putDataInElement(data) {
		element.html(data);
	}

}