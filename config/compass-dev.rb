require 'compass'

# Require any additional compass plugins here.

# Get the directory that this configuration file exists in
dir_src = File.dirname(__FILE__)

# Set this to the root of your project when deployed:
http_path = "/"
project_path = File.join(dir_src, "../", "")

sass_dir = "src/styles"
sass_path = sass_dir

css_dir = "styles"
css_path  = File.join(dir_src, "../app", "css")

images_dir = "images"
images_path  = File.join(dir_src, "../app", "img")

javascripts_dir = "scripts"
javascripts_path  = File.join(dir_src, "../app", "js")

# SPRITES
# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.mv filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s([a-z0-9]{10})\.png}, '.png?v\1')
    end
  end
end

# disable asset cache buster for replace-text-with-dimensions mixin
asset_cache_buster do |http_path, real_path|
  nil
end

#Environment
environment = :development

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
preferred_syntax = :sass

# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
debug_info = false
