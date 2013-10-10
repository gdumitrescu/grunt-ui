(function () {

  "use strict";
  module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),


      jshint: {
        options: {
          jshintrc: ".jshintrc",
          globals: {
            document: true,
            console: true,
            $: true,
            jQuery: true,
            define: true,
            require: true,
            module: true,
            describe: true,
            it: true,
            expect: true,
            _: true
          }
        },
        gruntfile: ["Gruntfile.js"],
        src: ["app/js/*.js"]
      },

      compass: {
        dev: {
          options: {
            config: "config/compass-dev.rb"
          }
        },
        prod: {
          options: {
            config: "config/compass-prod.rb"
          }
        }
      },

      coffee: {
        compile: {
          options: {
            bare: false,
          },
          files: {
            "app/js/*.js": [
              "src/scripts/**/*.coffee",
              "src/scripts/*.coffee"
            ]
          }
        }
      },

      concat: {
        scripts: {
          dist: {
            src: [
              "vendor/assets/**/*.js",
              "src/scripts/**/*.js"
            ],
            dest: ["dist/js/app.js"]
          }
        }
      },

      cssmin: {
        css: {
          src: "dist/css/app.css",
          dest: "dist/css/app.min.css"
        }
      },

      uglify: {
        js: {
          src: "dist/js/app.js",
          dest: "dist/js/app.min.js"
        }
      },

      "gh-pages": {
        options: {
          base: "dist/"
        },
        src: ["**/*"]
      },

      clean: {
        build: ["dist"]
      },

      watch: {
        gruntfile: {
          files: "Gruntfile.js",
          tasks: ["jshint:gruntfile"]
        },
        scripts: {
          files: ["src/js/*.js"],
          tasks: ["jshint:src"]
        },
        compass: {
          files: ["src/styles/**/*.{scss,sass}"],
          tasks: ["compass"]
        },
        coffee: {
          files: ["src/scripts/*.coffee"],
          tasks: "coffee"
        },
        livereload: {
          options: {
            livereload: true
          },
          files: ["app/**/*"]
        }

      }

    });

    // load tasks
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-gh-pages");

    // register task
    grunt.registerTask("default", [
      "compass:dev",
      "coffee",
      "jshint",
      "watch"
    ]);

    grunt.registerTask("build", [
      "compass:prod",
      "coffee",
      "jshint",
      "concat",
      "uglify",
      "cssmin"
    ]);

    grunt.registerTask("deploy", [
      "build",
      "gh-pages"
    ]);
  };

}());
