<?php

$domains = [
	'development' => ['localhost'],
	'production' => ['production.com.br'],
	'staging' => ['staging.com.br']
];

$currentDomain = str_replace('www.', '', $_SERVER['HTTP_HOST']);

foreach ($domains as $key => $group) {
	foreach ($group as $domain) {
		if (strpos($currentDomain, $domain) !== false) {
			include 'wp-config-'.$key.'.php';
			break;
		}
	}
}
