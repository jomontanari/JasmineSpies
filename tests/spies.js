describe("How Jasmine Spies work", function() {

    it("can create a method for you", function() {

        var fakeElement = {};
        fakeElement.css = function() {
        };
        fakeElement.show = jasmine.createSpy("Show spy");

        var toggleable = new Toggleable(fakeElement);

        toggleable.toggle();

        expect(fakeElement.show).toHaveBeenCalled();

    });

    it("can spy on an existing method", function() {

        var fakeElement = $("<div style='display:none'></div>");
        spyOn(fakeElement, 'show');

        var toggleable = new Toggleable(fakeElement);

        toggleable.toggle();

        expect(fakeElement.show).toHaveBeenCalled();

    });

    it("can tell you when a method has - and hasn't - been called", function() {

        var fakeElement = $("<div style='display:none'></div>");
        spyOn(fakeElement, 'show');
        spyOn(fakeElement, 'hide');

        var toggleable = new Toggleable(fakeElement);

        toggleable.toggle();

        expect(fakeElement.show).toHaveBeenCalled();
        expect(fakeElement.hide).not.toHaveBeenCalled();

    });

    it("can create a method for you", function() {

        var fakeElement = {};
        fakeElement.css = jasmine.createSpy("CSS spy").andReturn("none");
        fakeElement.show = jasmine.createSpy("Show spy");

        var toggleable = new Toggleable(fakeElement);

        toggleable.toggle();

        expect(fakeElement.show).toHaveBeenCalled();

    });

    it("can create a method for you with some logic", function() {

        var fakeElement = {};
        fakeElement.css = jasmine.createSpy("CSS spy").andCallFake(function(property) {
            if (property === "display") {
                return "none";
            }
        });

        fakeElement.show = jasmine.createSpy("Show spy");

        var toggleable = new Toggleable(fakeElement);

        toggleable.toggle();

        expect(fakeElement.show).toHaveBeenCalled();

    });

    it("can call a callback that's passed and check the parameters", function() {

        var fakeElement = {};
        fakeElement.html = jasmine.createSpy("html for fake element");

        var container = new DataContainer(fakeElement);

        var fakeData = "This will be the new html";
        $.ajax = jasmine.createSpy().andCallFake(function(params) {
            params.success(fakeData);
        });

        container.loadData();

        expect(fakeElement.html).toHaveBeenCalledWith(fakeData);
    });

    it("can tell if a method has been called or not", function() {

        var fakeElement = {};
        fakeElement.html = jasmine.createSpy("html for fake element");
        fakeElement.text = jasmine.createSpy("text for fake element");

        var container = new DataContainer(fakeElement);

        var fakeData = "This will be the new html";
        $.ajax = jasmine.createSpy().andCallFake(function(params) {
            params.success(fakeData);
        });

        container.loadData();

        expect(fakeElement.html).toHaveBeenCalled();
        expect(fakeElement.text).not.toHaveBeenCalled();
    });

    it("can tell if a method has been called or not and check the parameters", function() {

        var fakeElement = {};
        fakeElement.html = jasmine.createSpy("html for fake element");
        fakeElement.text = jasmine.createSpy("text for fake element");

        var container = new DataContainer(fakeElement);

        var fakeData = "This will be the new html";
        $.ajax = jasmine.createSpy().andCallFake(function(params) {
            params.success(fakeData);
        });

        container.loadData();

        expect(fakeElement.html).toHaveBeenCalledWith(fakeData);
    });

    it("can check the arguments passed to a function", function() {

        var fakeElement = {};
        fakeElement.html = jasmine.createSpy("html for fake element");

        var container = new DataContainer(fakeElement);

        var fakeData = "This will be the new html";
        $.ajax = jasmine.createSpy("Ajax Spy").andCallFake(function(params) {
            params.success(fakeData);
        });

        container.loadData();

        expect($.ajax).toHaveBeenCalledWith({
            url : 'http://postposttechnical.com/',
            context : document.body,
            success : jasmine.any(Function)
        });

    });
});

