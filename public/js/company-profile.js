let url = document.URL;
let myId = url.slice(url.lastIndexOf("?") + 1, url.length);
$.ajax({
    url: 'http://localhost:3000/api/company/' + myId,
    type: 'GET', // get [post delete put]
    success: function(callback) {
        var res = "";

        $(callback.result).each(function() {
            let video = this.video;
            video = video.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
            console.log(video);
            res += `<div class="container">

            <div class="main-body">

                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                      


                        <div class="card" style="margin-top: 10%">
                            <div class="card-body">
                                <h3>About ${this.name}</h3>
                                <iframe width="560" style=" width: 100%; height: 100%; " height="315" src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                        </div>

                    </div>

                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-body" style="padding: 4%">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Company Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        ${this.name}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${this.email}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Phone</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${this.phone}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Company Site</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${this.country} , ${this.city}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3" style="padding: 15px;">
                            <div class=" h-100">
                                <div class="row">

                                    <div class="three columns header-col">
                                        <h1><span>About  ${this.name}</span></h1>
                                    </div>

                                    <div class="nine columns main-col">

                                        <div class="row item">

                                            <div class="twelve columns">

                                              
                                                <p>
                                                ${this.Details}
                                                </p>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="card mb-3" style="padding: 5%;">
                            <div class="row">

                                <div class="three columns header-col" style="margin-bottom: 5%">
                                    <h1><span>Jobs</span></h1>
                                </div>

                                <div>
                                   
                                    <div class="model-box">
                                        <div class="detail">
                                            <div class="image">
                                                <img width="280px" height="250px" src="http://placekitten.com/200/138">
                                            </div>
                                            <div class="desc-job">
                                                <p class="title-type"><span class="sub-title">Job Title:</span> Job 2</p>
                                                <p class="title-type"><span class="sub-title">Date posted:</span> 10/10/2020</p>
                                                <p class="title-type"><span class="sub-title">Job salary:</span> 1000$</p>
                                                <p class="title-type"><span class="sub-title">Job type:</span> part-time</p>
                                                <p class="title-type"><span class="sub-title">Job description:</span> description</p>
                                                <p class="title-type"><span class="sub-title">Job-status :</span> open</p>
                                                <div class="root-skill-job">
                                                    <ul class="ui-skill">
                                                        <li class="skills-job">C</li>
                                                        <li class="skills-job">js</li>
                                                        <li class="skills-job">HTML</li>
                                                        <li class="skills-job">CSS</li>
                                                        <li class="skills-job">C</li>
                                                        <li class="skills-job">js</li>
                                                        <li class="skills-job">HTML</li>
                                                        <li class="skills-job">CSS</li>
                                                    </ul>
                                                </div>
                                                <p style="padding-top: 10px;"><strong><a href="job-detail.html">Click here to more detail...</a></strong></p>
                                            </div>
                                            <div class="views">
                                                <img width="15px" height="15px" src="https://cdn.onlinewebfonts.com/svg/img_56374.png">
                                                <p class="number-views">1100</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

</div>`;


        });

        $("#company-profile").html(res);
    },
});