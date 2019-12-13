function formCrawler() {
    let fields = $("form:eq(0)").find(":input").map(function (a, b) {
        let labelFind = $(b).parentsUntil('form').filter(function () {
            return this.innerText != "";
        });

        // let label = (labelFind.length >= 0 && labelFind.get(0).innerText) ? labelFind.get(0).innerText.trim() : ""; 
        let label = $(labelFind).eq(0)
            .clone()    //clone the element
            .children() //select all the children
            .remove()   //remove all the children
            .end()  //again go back to selected element
            .text().trim();
        let name = $(b).attr('name') || "";
        let type = $(b).attr('type') || "";
        let placeholder = $(b).attr('placeholder') || "";
        let id = $(b).attr('id') || "";
        let required = $(b).attr('required') || "";
        let classNames = $(b).attr('class') || "";
        let value = $(b).val() || "";
        return {
            label, name, type, placeholder, id, required, classNames,
            value
        }
    }).toArray();

    let form = {}; $($("form").get(0).attributes).toArray().map(function (a, b) {
        form[a.name] = a.value;
    });
    form.fields = fields;

    let local = {};
    Object.keys(location).filter(i => { return (typeof location[i] == "string") }).map(function (a, b) {
        local[a] = location[a];
    });
    local.form = form;
    return local;
}