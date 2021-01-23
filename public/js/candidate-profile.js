let url = document.URL;
let myId = url.slice(url.lastIndexOf("?") + 1, url.length);
$.ajax({
    url: 'http://localhost:3000/api/student/' + myId,
    type: 'GET', // get [post delete put]
    success: function(callback) {
        var res = "";

        $(callback.result).each(function() {
            res += `<div class="container" style="margin-top: 5%">

            <div class="main-body">

                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src="img/candidate-profile-pic.png" alt="Student picture" class="rounded-circle" width="150">
                                    <div class="mt-3">
                                        <h4>${this.std_name}</h4>
                                        <p class="text-secondary mb-1">${(this.gender == "M" ? "Male" : "Female")}</p>
                                        <p class="text-muted font-size-sm">${this.country} , ${this.city} </p>
                                        <button class="btn btn-primary">Download Resume</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-body" style="padding: 4%">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${this.std_name}
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
                                        <h6 class="mb-0">Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${this.country} , ${this.city} 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3" style="padding: 2%;">
                            <div class=" h-100">
                                <div class="row education">

                                    <div class="three columns header-col">
                                        <h1>Education</h1>
                                    </div>

                                    <div class="nine columns main-col">

                                        <div class="row item">

                                            <div class="twelve columns">

                                                <h3>University of Life</h3>
                                                <p class="info">Master in Graphic Design <span>&bull;</span> <em class="date">April 2007</em></p>

                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                                                    sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Nullam dictum felis eu pede mollis pretium.
                                                </p>

                                            </div>

                                        </div>

                                        <div class="row item">

                                            <div class="twelve columns">

                                                <h3>School of Cool Designers</h3>
                                                <p class="info">B.A. Degree in Graphic Design <span>&bull;</span> <em class="date">March 2003</em></p>

                                                <p>
                                                    This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet
                                                    mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat
                                                </p>

                                            </div>

                                        </div>
                                        <!-- item end -->

                                    </div>
                                    <!-- main-col end -->

                                </div>
                            </div>
                        </div>


                        <div class="card mb-3" style="padding: 2%;">
                            <div class="row work">

                                <div class="three columns header-col">
                                    <h1><span>Work</span></h1>
                                </div>

                                <div class="nine columns main-col">

                                    <div class="row item">

                                        <div class="twelve columns">

                                            <h3>Awesome Design Studio</h3>
                                            <p class="info">Senior UX Designer <span>•</span> <em class="date">March 2010 - Present</em></p>

                                            <p>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                                                sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Nullam dictum felis eu pede mollis pretium.
                                            </p>

                                        </div>

                                    </div>
                                    <!-- item end -->

                                    <div class="row item">

                                        <div class="twelve columns">

                                            <h3>Super Cool Studio</h3>
                                            <p class="info">UX Designer <span>•</span> <em class="date">March 2007 - February 2010</em></p>

                                            <p>
                                                This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet
                                                mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat
                                            </p>

                                        </div>

                                    </div>
                                    <!-- item end -->

                                </div>
                                <!-- main-col end -->

                            </div>
                        </div>

                        <div class="card mb-3" style="padding: 2%;">
                            <div class="row skill">

                                <div class="three columns header-col">
                                    <h1><span>Skills</span></h1>
                                </div>

                                <div class="nine columns main-col">

                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                    </p>

                                    <div class="bars">
                                        <ul class="root-skill-job">
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
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </div>`;


        });

        $("#candidate-profile").html(res);
    },
});