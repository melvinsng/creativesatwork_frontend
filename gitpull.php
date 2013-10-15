<?php

echo getcwd() . "\n";
echo '<p>beginning git pull...</p>';
echo shell_exec('/usr/bin/git pull 2>&1');
echo '<p>done</p>';
?>
