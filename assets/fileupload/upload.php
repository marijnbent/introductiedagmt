<?php
require 'main.php';
?>
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>PhotoAlbum - Upload page</title>


    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="lib/jquery.ui.widget.js"></script>
    <script src="lib/jquery.iframe-transport.js"></script>
    <script src="lib/jquery.fileupload.js"></script>
    <script src="lib/jquery.cloudinary.js"></script>
    <?php echo cloudinary_js_config(); ?>
  </head>
  
  <body>

    
    <!-- A form for direct uploading using a jQuery plug-in. 
          The cl_image_upload_tag PHP function generates the required HTML and JavaScript to
          allow uploading directly from the browser to your Cloudinary account -->

    <div id='direct_upload'>
      <h1>Direct upload from the browser</h1>
      <form>
      <?php
          # The callback URL is set to point to an HTML file on the local server which works-around restrictions
          # in older browsers (e.g., IE) which don't full support CORS.
          echo cl_image_upload_tag('test', array("tags" => "direct_photo_album", "callback" => $cors_location, "html" => array("multiple" => true)));

      ?>
      </form>
    <!-- status box -->

  
      <div class="uploaded_info_holder">
      </div>
    </div>


    
    <script>
      function prettydump(obj) {
        console.log(obj.url);
      }
      
      $(function() {
        $('.cloudinary-fileupload')
        .fileupload({
        })
        .on('cloudinarydone', function (e, data) {
            $('.status_value').text('Idle');
            $.post('upload_complete.php', data.result);
            var info = $('<div class="uploaded_info"/>');
            $(info).append($('<div class="data"/>').append(prettydump(data.result)));
            });
      });

    </script>
  </body> 
</html>

