// correct the skills and views  and the job type

$.ajax({
    url: 'http://localhost:3000/api/jobs/page/1',
    type: 'GET', // get [post delete put]
    success: function(callback) {
        var res = "";

        $(callback.result).each(function() {
            res +=
                `<div class="model-box">

                <div class="detail">
                    <div class="image">
                        <img alt="job image" title="job image" width="280px" height="250px" src="${this.video}">
                    </div>
                    <div class="desc-job" data-id="${this.job_id}">
                        <p class="title-type"><span class="sub-title">${this.job_title}</span></p>
                        <p class="title-type"><span class="sub-title">${this.description}</span></p>
                        <p class="title-type"><span class="sub-title">${this.job_type}</span></p>
                        <p class="title-type"><span class="sub-title">The Salary is ${this.salary} $</span></p>
                        <p class="title-type"><span class="sub-title">The Job is ${(this.status) == "U" ? "Unavailable" : "Available"}</span></p>   
                        <p class="title-type"><span class="sub-title">${formatDate(this.date_posted)}</span></p>
                        <ul class="root-skill-job">`;
            for (let i = 0; i < this.job_skills.length; i++) {
                res += ` <li class="skills-job"> ${this.job_skills[i]} </li>`;
            }

            res += `</ul>
                        <p style="padding-top: 10px;"><strong><a href="job-detail.html?${this.job_id}">Click here to more detail...</a></strong></p>
                    </div>
                    <div class="views">
                        <img width="15px" height="15px" src="https://cdn.onlinewebfonts.com/svg/img_56374.png">
                        <p class="number-views">${this.job_views}</p>
                    </div>
                </div>
            </div>`
        });

        $("#job_offers").html(res);
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
        url: 'http://localhost:3000/api/jobs/page/' + id,
        type: 'GET', // get [post delete put]
        success: function(callback) {
            var res = "";
            $(callback.result).each(function() {
                res +=
                    `<div class="model-box">
    
                    <div class="detail">
                        <div class="image">
                            <img alt="job image" title="job image" width="280px" height="250px" src="${this.video}">
                        </div>
                        <div class="desc-job" data-id="${this.job_id}">
                            <p class="title-type"><span class="sub-title">${this.job_title}</span></p>
                            <p class="title-type"><span class="sub-title">Job type:</span>${this.job_type}</p>
                            <p class="title-type"><span class="sub-title">${this.description}</span></p>
                            <p class="title-type"><span class="sub-title">The Job is ${(this.status) == "U" ? "Unavailable" : "Available"}</span></p>
                            <p class="title-type"><span class="sub-title">The Salary is ${this.salary} $</span></p>
                            <p class="title-type"><span class="sub-title">${formatDate(this.date_posted)}</span></p>
                            <ul class="root-skill-job"> `;
                for (let i = 0; i < this.job_skills.length; i++) {
                    res += ` <li class="skills-job"> ${this.job_skills[i]} </li>`;
                }
                res += `</ul>
                            <p style="padding-top: 10px;"><strong><a href="job-detail.html?${this.job_id}">Click here to more detail...</a></strong></p>
                        </div>
                        <div class="views">
                            <img width="15px" height="15px" src="https://cdn.onlinewebfonts.com/svg/img_56374.png">
                            <p class="number-views">${this.job_views}</p>
                        </div>
                    </div>
                </div>`
            });
            $("#job_offers").html(res);
        },
    });

});