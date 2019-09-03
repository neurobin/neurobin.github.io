<?php error_reporting(E_ERROR | E_PARSE); ?>
<?php
chdir(rtrim(dirname($_SERVER['PHP_SELF']),'/')); //must stay at the top most line of the page.
   $__CURDIR=dirname($_SERVER['PHP_SELF']);
   $pat='/(\/|^)[^\/]*/';
   $__CURDIR = preg_replace('/^\.\//', '', $__CURDIR);
   $__CURDIR = preg_replace('/^\//', '', $__CURDIR);
   if($__CURDIR=='.'||$__CURDIR=='./'||$__CURDIR=='/'||$__CURDIR==''){$__RDOCROOT='./';$__CURDIR='./';}
   else {$__RDOCROOT=preg_replace($pat,'../',$__CURDIR);}
   include_once($__RDOCROOT.'essentials.php'); //$__RDOCROOT contains a / at end
?>
<?php
include_once($__RDOCROOT.'php/templates/global-vars.php');
include_once($__RDOCROOT.'php/templates/html-head.php');
include_once($__RDOCROOT.'php/templates/terminate-head-and-start-body.php');
include_once ($__RDOCROOT.'header.php');
?>
<?php getScrollToBottomButton(); ?>
		<!--Navigation bar ends here -->
		<!-- fixed share button-->
		<?php
		include_once ($__RDOCROOT.'fixedsharebutton.php');
		?>
		<!-- fixed share button end-->
<?php include_once($__RDOCROOT.'php/templates/showoff/showoff-soft.php'); ?>

		<!-- show off ends here-->
<?php include_once($__RDOCROOT.'php/templates/head-button-start.php'); ?>
						<a href="https://github.com/neurobin/uedit">View On Github</a>
						<a href="https://github.com/neurobin/uedit/archive/master.zip">Download .zip</a>
						<a href="https://github.com/neurobin/uedit/archive/master.tar.gz">Download .tar.gz</a>
<a href="uedit.html">Go Edit</a>
<a href="showinfo/">More Info</a>

<?php include_once($__RDOCROOT.'php/templates/head-button-end.php'); ?>

<?php include_once($__RDOCROOT.'php/templates/container/content-container-start.php'); ?>
<?php include_once($__RDOCROOT.'php/templates/container/content-row-start.php'); ?>
<?php
$parse=new Parsedown();
//$filename="https://raw.github.com/neurobin/uedit/master/README.md";
$filename="README.md";
echo  $parse->text(file_get_contents($filename));

?>	
<?php include_once($__RDOCROOT.'contribute-message.php'); ?>
<?php include_once($__RDOCROOT.'social-pages.php'); ?>

<?php include_once($__RDOCROOT.'php/templates/container/content-row-end.php'); ?>
<?php include_once($__RDOCROOT.'php/templates/container/content-container-end.php'); ?>

<?php
		include_once ($__RDOCROOT.'php/templates/disqus/disqus-div.php');
?>
		<!--Content  ends here -->
		<?php getScrollToTopButton(); ?>
		<?php
		include_once ($__RDOCROOT.'footer.php');
		?>

	</body>
</html>
