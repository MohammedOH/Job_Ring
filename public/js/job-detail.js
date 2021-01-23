let url = document.URL;
let myId = url.slice(url.lastIndexOf("?") + 1, url.length);
$.ajax({
    url: 'http://localhost:3000/api/jobs/' + myId,
    type: 'GET', // get [post delete put]
    success: function(callback) {
        var res = "";
        $(callback.result).each(function() {
            let video = this.video;
            video = video.replace("https://youtu.be/", "https://www.youtube.com/embed/");
            res += `<div class="container">
            <div style="float: right; width: 65%;" class="well">
                <div class="media">
                    <div class="media-body">
                        <h4 class="media-heading">${this.job_title}</h4>
                        <p style="margin: 8px; border-radius: 3px; background: rgb(77 123 248); line-height: 37px; cursor: pointer; padding: 0 10px; color: #fffcd0 !important; font-weight: 600; width: 140px; float: right;  text-align: center !important;" class="text-right">Apply The Job</p>
                        <p>${(this.description).length > 200 ? (this.description).substring(0,this.description.length/2) : this.description}</p>
                        <br><br>
                        <div id="shown-video">
                        <iframe width="560" height="315" src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
                        </div><br>
                        <p>${(this.description).length > 200 ? (this.description).substring(this.description.length/2,this.description.length) : ""}</p><br>

                        <hr class="hr-body">
                        <ul>
                            <li>Salary: ${this.salary}$</li>
                            <li>Job Type: ${this.job_type}</li>
                        </ul>

                        <div class="root-skill-job">Skills:`;
            for (let i = 0; i < this.job_skills.length; i++) {
                res += ` <li class = "skills-job" > ${this.job_skills[i]} `;
            }


            res += `</div>
                        <br>
                        <ul class="list-inline list-unstyled">
                            <li><span><i class="glyphicon glyphicon-calendar"></i> ${formatDate(this.date_posted)} </span></li>      
                            <li>|</li>
                            <li>
                                <!-- Use Font Awesome http://fortawesome.github.io/Font-Awesome/ -->
                                <span><i class="fa fa-facebook-square"></i></span>
                                <span><i class="fa fa-twitter-square"></i></span>
                                <span><i class="fa fa-google-plus-square"></i></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
        });

        $("#job-detail").html(res);
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