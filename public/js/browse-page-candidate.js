$.ajax({
    url: 'http://localhost:3000/api/student/page/1',
    type: 'GET',
    success: function(callback) {
        var res = "";

        $(callback.result).each(function() {
            res +=
                `<div class="model-box">
                <div class="detail">
                    <div class="image">
                        <img title="personal image" alt="personal image" width="280px" height="250px" src="${this.picture}">
                    </div>
                    <div class="desc-job">
                        <p class="title-type"><span class="sub-title">${this.std_name}</span></p>
                        <p class="title-type"><span class="sub-title">Country: ${this.country}</span></p>
                        <p class="title-type"><span class="sub-title">BirthDay: ${formatDate(this.birthdate)}</span></p>
                        <p class="title-type"><span class="sub-title">Phone: ${this.phone}</span></p>
                        <ul class="ui-skill">
                            <li class="skills-job">C</li>
                            <li class="skills-job">js</li>
                            <li class="skills-job">HTML</li>

                        </ul>
                    </div>
                    <div class="info-candidate">
                        <p><strong><a href="candidate-profile.html?${this.std_id}">Click here to more detail...</a></strong></p>
                    </div>

                </div>

            </div>`
        });

        $("#candidate").html(res);
    },
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


$(document).on("click", ".page-link", function() {
    id = $(this).data("page");
    $.ajax({
        url: 'http://localhost:3000/api/student/page/' + id,
        type: 'GET', // get [post delete put]
        success: function(callback) {
            var res = "";
            $(callback.result).each(function() {
                res +=
                    `<div class="model-box">
                <div class="detail">
                    <div class="image">
                        <img title="personal image" alt="personal image" width="280px" height="250px" src="${this.picture}">
                    </div>
                    <div class="desc-job">
                        <p class="title-type"><span class="sub-title">${this.std_name}</span></p>
                        <p class="title-type"><span class="sub-title">Country: ${this.country}</span></p>
                        <p class="title-type"><span class="sub-title">BirthDay: ${formatDate(this.birthdate)}</span></p>
                        <p class="title-type"><span class="sub-title">Phone: ${this.phone}</span></p>
                        <ul class="ui-skill">
                            <li class="skills-job">C</li>
                            <li class="skills-job">js</li>
                            <li class="skills-job">HTML</li>

                        </ul>
                    </div>
                    <div class="info-candidate">
                        <p><strong><a href="candidate-profile.html?${this.std_id}">Click here to more detail...</a></strong></p>
                    </div>

                </div>

            </div>`
            });

            $("#candidate").html(res);
        },
    });

});