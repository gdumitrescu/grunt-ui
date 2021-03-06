(function () {

  "use strict";
  module.exports = function(grunt) {

    // load tasks
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    require("time-grunt")(grunt);

    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),

      jshint: {
        options: {
          reporter: require("jshint-stylish"),
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
            config: "config/compass-dev.rb",
            bundleExec: true
          }
        },
        prod: {
          options: {
            config: "config/compass-prod.rb",
            bundleExec: true
          }
        }
      },

      coffee: {
        compile: {
          options: {
            bare: false,
          },
          files: {
            "app/js/main.js": [
              "src/scripts/main.coffee"
            ],
            "app/js/app.js": [
              "src/scripts/app.coffee"
            ]
          }
        }
      },

      concat: {
        scripts: {
          build: {
            src: [
              "vendor/assets/**/*.js",
              "app/js/*.js"
            ],
            dest: ["deploy/js/app.js"]
          }
        },
        styles: {
          build: {
            src: [
              "vendor/assets/**/*.min.css",
              "app/css/*.css"
            ],
            dest: ["deploy/css/app.css"]
          }
        }
      },

      cssmin: {
        css: {
          src: "deploy/css/app.css",
          dest: "deploy/css/app.min.css"
        }
      },

      uglify: {
        js: {
          src: "deploy/js/app.js",
          dest: "deploy/js/app.min.js"
        }
      },

      "gh-pages": {
        options: {
          base: "deploy/"
        },
        src: ["**/*"]
      },

      clean: {
        build: ["deploy"]
      },

      concurrent: {
        dev: [
          "any-newer:coffee",
          "any-newer:compass:dev",
        ],
        test: [
          "newer:jshint"
        ],
        prod: [
          "any-newer:coffee",
          "any-newer:compass:prod"
        ],
        minify: [
          "any-newer:uglify",
          "any-newer:cssmin"
        ]
      },

      connect: {
        options: {
          port: 9000,
          livereload: 35729,
          // change this to "0.0.0.0" to access the server from outside
          hostname: "localhost"
        },
        livereload: {
          options: {
            open: true,
            base: [
              "app"
            ]
          }
        }
      },

      watch: {
        gruntfile: {
          files: ["Gruntfile.js"],
          tasks: ["newer:jshint:gruntfile"]
        },
        scripts: {
          files: ["app/js/*.js"],
          tasks: ["newer:jshint:src"]
        },
        compass: {
          files: ["src/styles/**/*.{scss,sass}"],
          tasks: ["any-newer:compass"]
        },
        coffee: {
          files: ["src/scripts/*.coffee"],
          tasks: ["any-newer:coffee"]
        },
        livereload: {
          options: {
            livereload: "<%= connect.options.livereload %>"
          },
          files: ["app/**/*"]
        }

      }

    });

    // register task
    grunt.registerTask("default", [
      "concurrent:dev",
      "concurrent:test",
      "watch",
      "connect"
    ]);

    grunt.registerTask("build", [
      "concurrent:prod",
      "concurrent:test",
      "concat",
      "concurrent:minify"
    ]);

    grunt.registerTask("deploy", [
      "build",
      "gh-pages"
    ]);
  };

}());
