#!/usr/bin/php -d display_errors
<?php


class Builder
{
    private $dir;
    private $textsDir;
    private $tmpl;
    private $langs;
    private $lang;
    private $mainLang;
    private $specialTags;
    private $targets;
    private $targetUrls;
    private $realLangCodes;
    private $activeStatus;

    private $currentLang;

    public function __construct()
    {
        $this->dir = dirname(__FILE__);
        $this->textsDir = $this->dir . '/lang';
        $this->tmpl = $this->dir . '/index.tmpl.html';

        $this->langs = array('de' => 'Deutsch', 'en' => 'English', 'fr' => 'Français', 'tg' => 'Thurgauerdialekt');
        $this->realLangCode = array('de' => 'de', 'en' => 'en', 'fr' => 'fr', 'tg' => 'de-ch-tg');
        $this->activeStatus = array('de' => true, 'en' => false, 'fr' => false, 'tg' => false);
        $this->mainLang = 'de';

        $this->specialTags = array('metaRobots', 'alternativeLangLinks', 'langCode', 'langNav', 'buildDate');

        $this->constructTargets();
        $this->createTargetFiles();
    }



    private function constructTargets()
    {
        $this->targets = array();
        $this->targetUrls = array();
        foreach ($this->langs as $langCode => $name) {
            if ($langCode == $this->mainLang) {
                $this->targets[$langCode] = $this->dir . '/index.html';
                $this->targetUrls[$langCode] = 'index.html';
            } else {
                $this->targets[$langCode] = $this->dir . '/index_' . $langCode . '.html';
                $this->targetUrls[$langCode] = 'index_' . $langCode . '.html';
            }
        }
    }


    private function createTargetFiles() {

        $contentLines = file($this->tmpl);
        foreach ($this->targets as $langCode => $target) {
            $this->currentLang = $langCode;

            include($this->textsDir . '/' . $langCode . '.php');

            $targetContent = '';
            foreach ($contentLines as $line) {
                if (isset($lang[$langCode])) {
                    if (preg_match_all('{{([A-Za-z0-9_]+)}}', $line, $matches)) {
                        foreach ($matches[1] as $replacer) {
                            if (in_array($replacer, $this->specialTags)) {
                               $line = $this->specialReplace($replacer, $line);
                            } else {
                                if (isset($lang[$langCode][$replacer])) {
                                    $line = str_replace('{{' . $replacer . '}}', $lang[$langCode][$replacer], $line);
                                }
                            }
                        }
                    }
                }
                $targetContent .= $line;
            }

            file_put_contents($target, $targetContent);

        }
    }




    private function specialReplace($replacer, $line) {
        if ($replacer == 'langCode') {
            $line = str_replace('{{langCode}}', $this->realLangCode[$this->currentLang], $line);
        } elseif ($replacer == 'langNav') {
            $line = str_replace('{{langNav}}', $this->buildNav(), $line);
        } elseif ($replacer == 'buildDate') {
            $line = str_replace('{{buildDate}}', date('Y-m-d H:i:s'), $line);
        } elseif ($replacer == 'metaRobots') {
            if ($this->activeStatus[$this->currentLang]) {
                $line = str_replace('{{metaRobots}}', 'index, follow', $line);
            } else {
                $line = str_replace('{{metaRobots}}', 'noindex, nofollow', $line);
            }
        } elseif ($replacer == 'alternativeLangLinks') {
            $line = str_replace('{{alternativeLangLinks}}', $this->getAlternateLinks(), $line);
        }

        return $line;
    }


    private function buildNav() {
        $o = '<div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ' . $this->langs[$this->currentLang] . ' <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">';
            foreach ($this->langs as $langCode => $langName) {
                if ($this->activeStatus[$langCode]) {
                    $o .= '<li><a href="' . $this->targetUrls[$langCode] . '">' . $langName . '</a></li>';
                }
            }

            $o .= '</ul>
            </div>';
        return $o;
    }


    private function getAlternateLinks() {
        $o = '';
        foreach ($this->langs as $langCode => $langName) {
            if ($this->activeStatus[$langCode]) {
                $langSuffix = '_' . $langCode;
                if ($langCode == 'de') {
                    $langSuffix = '';
                }

                $o .= '<link rel="alternate" href="https://bespr.github.io/SlamScoreBoard/index' . $langSuffix . '.html" hreflang="' . $this->realLangCode[$langCode] . '" />' . PHP_EOL;
            }
        }

        return $o;
    }


}


new Builder();
