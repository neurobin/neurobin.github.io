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
?><?php
$configfile='.config';
if(($string=file_get_contents($configfile))===FALSE){
$title='';
$desc='';
$showoffhead='';
$keywords='';
$type='';
$name='';
$tag='';
}
else{
$string='
'.$string;
if(preg_match('/(?<=\ntitle=).*/i',$string,$match)){$title=$match[0];}else {$title='';}
if(preg_match('/(?<=\ndescription=).*/i',$string,$match)){$desc=$match[0];}else {$desc='';}
if(preg_match('/(?<=\nshowoffhead=).*/i',$string,$match)){$showoffhead=$match[0];}else {$showoffhead='';}
if(preg_match('/(?<=\nkeywords=).*/i',$string,$match)){$keywords=$match[0];}else {$keywords='';}
if(preg_match('/(?<=\ntype=).*/i',$string,$match)){$type=$match[0];}else {$type='';}
if(preg_match('/(?<=\nname=).*/i',$string,$match)){$name=$match[0];}else {$name='NDemo';}
if(preg_match('/(?<=\ntag=).*/i',$string,$match)){$tag=$match[0];}else {$tag='A Neurobin app';}

}


?>
<!DOCTYPE html>
<html lang="en">
	<head>


<?php include_once($__RDOCROOT.'statichead.php'); ?>


		<meta name="description" content="Universal Text Editor User Manual">
		<meta name="keywords" content="uedit,neurobin,universal text editor,text editor" />
		<title>Uedit User Manual<?php echo $titletag ?></title>

<?php include_once($__RDOCROOT."terminate-head-and-start-body.php"); ?>

		<?php
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
<a href="../uedit.html">Editor</a>
<?php include_once($__RDOCROOT.'php/templates/head-button-end.php'); ?>

<?php include_once($__RDOCROOT.'php/templates/container/content-container-start.php'); ?>
<?php include_once($__RDOCROOT.'php/templates/container/content-row-start.php'); ?>
<?php
$parse=new Parsedown();
//$filename="https://raw.github.com/neurobin/uedit/master/README.md";
$filename="info.md";
echo  $parse->text(file_get_contents($filename));

?>	

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
