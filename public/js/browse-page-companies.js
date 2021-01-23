$.ajax({
    url: 'http://localhost:3000/api/company/page/1',
    type: 'GET',
    success: function(callback) {
        var res = "";
        var job_type = "";
        $(callback.result).each(function() {
            res +=
                ` <div class="model-box">
                <div class="detail">
                    <div class="image">
                        <img width="280px" height="250px" src="${this.video}">
                    </div>
                    <div class="desc-job">
                        <p class="title-type"><span class="sub-title">${this.name}</span></p>
                        <p class="title-type"><span class="sub-title">${this.country}</span></p>
                        <p class="title-type"><span class="sub-title">${this.city}</span></p>
                        <p class="title-type"><span class="sub-title">Phone: ${this.phone}</span></p>
                        <p class="title-type-comp"><span class="sub-title">${this.Details}</span></p>
                    </div>
                    <div class="info-company">
                        <p style="padding-top: 10px;"><strong><a href="company-profile.html?${this.c_id}">Click here to more detail...</a></strong></p>
                    </div>



                </div>

            </div>`
        });

        $("#company").html(res);
    },
});


$(document).on("click", ".page-link", function() {
    id = $(this).data("page");
    $.ajax({
        url: 'http://localhost:3000/api/company/page/' + id,
        type: 'GET', // get [post delete put]
        success: function(callback) {
            var res = "";
            $(callback.result).each(function() {
                res +=
                    ` <div class="model-box">
                <div class="detail">
                    <div class="image">
                        <img width="280px" height="250px" src="${this.video}">
                    </div>
                    <div class="desc-job">
                        <p class="title-type"><span class="sub-title">${this.name}</span></p>
                        <p class="title-type"><span class="sub-title">${this.country}</span></p>
                        <p class="title-type"><span class="sub-title">${this.city}</span></p>
                        <p class="title-type"><span class="sub-title">Phone: ${this.phone}</span></p>
                        <p class="title-type-comp"><span class="sub-title">${this.Details}</span></p>
                    </div>
                    <div class="info-company">
                        <p style="padding-top: 10px;"><strong><a href="company-profile.html?${this.c_id}">Click here to more detail...</a></strong></p>
                    </div>



                </div>

            </div>`
            });

            $("#company").html(res);
        },
    });

});