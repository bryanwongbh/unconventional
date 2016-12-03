+++
date = "2013-05-21T00:00:00Z"
title = "The Renewal"
categories = ["web development"]
tags = ["openshift", "technology"] 
+++

## Introduction

This post summarises on the setup of Octopress on Openshift which utilizes Greyshade theme as per Unconventional.co. 

As I have mentioned in my previous [post](http://www.unconventional.co/blog/2013/05/21/back-from-the-ashes/), Unconventional.co is alive and kicking! Previously, it is hosted on [Heroku](https://www.heroku.com/) and powered by [Obtvse](https://github.com/natew/obtvse). After Heroku added a 10k rows of DB limit for its Development box, I thought it was time to explore on another Platform-as-a-Service (PaaS) and hopefully, I do not need to change to another service.
Not to mention, I still got a lot to learn in terms of configuring a database (be it mysql or postgresql) to match it with a particular PaaS' offering (believe me, it is a pain in the a$$). Thus, having a blog that requires database configuration for a particular PaaS and maintenance is a hassle and I would much prefer to spend time to pen down ideas than to try to configure a database that works on one PaaS but does not work on another.

I have been working on [Openshift](https://www.openshift.com/‎) for a fair bit and its [pricing](https://www.openshift.com/developers/pricing) for its FreeShift is definitely attractive to most PaaS seekers out there (myself included). On the other hand, enlightenment dawns upon myself when I stumbled upon [Octopress](http://octopress.org/). Without the need to manage database for blogging and also utilizing the hacker way of publishing via `git push` to push updates to the server.

There are three parts:

- Setup an Openshift Account

- Setup Octopress and Link to Openshift

- Install Greyshade Theme

I would like to credit the deployment of Octopress to Openshift write-up to [Shellcode](http://www.shellco.de/) and the [Greyshade](http://shashankmehta.in/archive/2012/greyshade.html) theme design to Shashank Mehta.

And so, it begins...

<!--more-->

## Setup an Openshift Account

On this part, it is mainly about getting your own Openshift account and perform the necessary settings to accommodate Octopress deployment (for further details, please refer to [this](http://www.shellco.de/deploying-octopress-on-openshift/)).

The necessary steps are:

1. Click on Add Application in the dashboard of your Openshift account

2. Select and install Ruby 1.9 application

3. Copy the generated git repository URL (As an **example** `ssh://abc1234@blablabla-foobar.rhcloud.com/~/git/foobar.git/`)

## Setup Octopress and Link to Openshift

Next, this will mainly describe on the necessary settings to setup Octopress in your local machine and subsequently push it to Openshift.

Below are the next steps:

1. In your terminal, enter `git clone git://github.com/imathis/octopress.git octopress` at wherever you want to have Octopress in your local machine

2. Enter into the Octopress directory

3. In your terminal, enter `bundle install` to compile the Gemfile

4. Next, type `bundle exec rake install` to complete Octopress setup

Then, the local Octopress and Openshift has to be linked together in order to make the deployment to the PaaS a success (that is why the generated git repo URL is copied earlier on!). I have been following Shellcode's methodology in having a staging public directory. I think this methodology of having a staging public directory and utilizing only the necessary files to commit is disk-space relieving for most PaaS and I like it. Anyway, moving on:

1. Copy the Gemfile and config.ru file generated from the Octopress setup

2. Exit Octopress folder by going one level up or just enter `cd..` in your terminal

3. Create a *_deployment* folder and enter into it

4. Paste the copied Gemfile and config.ru file into the *_deployment* folder

5. Type `bundle install` to generate a Gemfile.lock

6. Create a *public* folder in it

7. Type `git init` to initialize the repository

8. Type `git remote add openshift ssh://abc1234@blablabla-foobar.rhcloud.com/~/git/foobar.git/`

9. Type `git add .`

10. Type `git commit -m "Initial commit"`

11. Exit *_deployment* folder by going one level up

12. Copy *_deployment folder* and enter Octopress folder

13. Paste *_deployment folder* within Octopress folder

14. Type `git add _deployment/`

15. Type `bundle exec rake new_post['Hello World']`

16. Edit the newly generated markdown file however you want and save it

17. Type `bundle exec rake generate` and this will generate some files within your public folder (*octopress/public*)

18. Enter into the directory *octopress/_deployment/public* and delete everything inside there

19. Copy all the files generated from *octopress/public* to *octopress/_deployment/public*

20. Enter to the folder *octopress/_deployment* in your terminal

21. Type `git add .` to add all the new files to be pushed to the Openshift repo

22. Type `git commit -m "New blog post"` 

23. Type `git push openshift master`

Then you will see Openshift spewing some stuff out in your terminal to show the background jobs running and once you see `remote: Done`, you can visit the URL of your blog in Openshift check how awesome it is to have it hosted there!

## Setup Greyshade Theme

Finally, this is regarding the installation of Greyshade theme to Octopress. The few main reasons why utilize Greyshade theme are:

- Responsiveness design (try use a mobile phone or tablet to view it, everything scales nicely)

- Simple and clean user interface

- Nicely designed favicon included for social media

The instructions for this portion is adopted from [here](https://github.com/shashankmehta/greyshade). So the steps in this part are:
 
1. Enter into the octopress folder in your local machine via your terminal

2. Type `git clone git@github.com:shashankmehta/greyshade.git .themes/greyshade` 

3. Go to this [website](http://hslpicker.com/) and pick a colour theme that you have not seen in [here](https://github.com/shashankmehta/greyshade/wiki/Sites-using-Greyshade)

4. In your terminal, type `echo "\$greyshade: *colour*;" >> sass/custom/_colors.scss //Substitue 'color' with your highlight color`; substitute *colour* with your chosen colour theme

5. Type `bundle exec rake "install[greyshade]"`

6. Delete everything that is within *octopress/public* and *octopress/public/_deployment*

7. Type `bundle exec rake generate` and copy the generated files in *octopress/public* to *octopress/public/_deployment*

8. Add your updated files for pushing to Openshift repo by typing `git add .`

9. Type `git commit -m "Updated theme for Octopress"`

10. Push your update to Openshift repo by typing `git push openshift master`

9. Go to the URL of your Openshift application and marvel upon the Greyshade themed Octopress, hosted by Openshift

## Conclusion

Thus, with this *unconventional* way of blog setup (rather than using readily-made available services such as Tumblr, hosted Wordpress or Blogger), learning via technology and blogging would definitely be fun! Cheers for your attention!

P.S. If you see any mistakes or just want to say hi, just drop a note below!
