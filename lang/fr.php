<?php

if (!isset($lang) || !is_array($lang)) {
    $lang = array();
}

$lang['fr'] = array(
    'Meta_Title' => 'SlamScoreBoard',
    'Meta_Description' => 'SlamScoreBoard (Slam-Score-Board) is a projection tool (Beamer Scoreboard) for poetry slam events.',
    'Meta_CanonicalUrl' => 'https://bespr.github.io/SlamScoreBoard',

    'Page_MainTitle' => 'Slam Score Board',
    'Page_Lead' => 'Beamer Scoreboard / Projection Tool for <a href="https://en.wikipedia.org/wiki/Poetry_slam">Poetry Slam</a>-events',

    'Intro_FirstParagraph' => 'Mit SSB ist die Projektion der Poetry-Slam-Resultate ein Kinderspiel. Die Projektion der Resultate kann individuell angepasst werden (wie viele Runden, welche Jury, etc.).',
    'Intro_SecondParagraph' => 'Die Bedienung erfolgt über einen Webbrowser. Dadurch musst du keine zusätzlichen Anwendungen installieren. Es wird auch keine Internetverbindung benötigt.',

    'Summary_Title' => 'Das Wichtigste in Kürze',
    'Summary_Element01' => 'SSB läuft im Webbrowser.',
    'Summary_Element02' => 'SSB ist ein Offline-Tool.',
    'Summary_Element03' => 'Die gängigsten Wettbewerbmodi können eingestellt werden (z.B. Vorrunden-Finale, Cup-Modus, etc.).',
    'Summary_Element04' => 'Jurywertung kann angepasst werden (z.B. Noten mit einer Dezimalstelle, Streichnoten, Applaus, etc.).',
    'Summary_Element05' => 'Einstellungen können vorab gespeichert und dann kurz vor der Veranstaltung wieder geladen werden.',
    'Summary_Element06' => 'Neben Deutsch auch in unseren anderen Lieblingssprachen erhältlich: Französisch, Englisch, Thurgauerdialekt.',
    'Summary_Element07' => 'Exportieren der Resultate in einer html- oder csv-Tabelle ist möglich. (Demnächst)',

    'Installation_Title' => 'Inbetriebnahme',
    'Installation_Download' => 'Download ZIP-Datei',
    'Installation_DownloadDev' => 'Neuste Developer-Version',
    'Installation_DownloadStable' => 'Stabiler Release',
    'Installation_DownloadStableNotes' => 'Bald oder irgendwann mal',
    'Installation_Unpack' => 'Entpacken',
    'Installation_OpenInBrowser' => '<code>SlamScoreBoard.html</code> in deinem Lieblingswebbrowser öffnen',

    'Video_Title' => 'Im Video erklärt',
    'Video_Note01' => 'Im Video auf die Schaltfläche <b>CC</b> klicken, um deutsche oder englische Untertitel einzublenden.',
    'Video_Note02' => 'Im Video auf das <b>Vimeo-Logo</b> klicken, um das Video <b>in HD-Qualität</b> (viel lesbarer) zu sehen',

    'Manual_Title' => 'Bedienungsanleitung',
    'Manual_Note01' => 'Wir haben ein sehr langes <a href="https://github.com/bespr/SlamScoreBoard/blob/master/documentation/UserManual.md">User Manual</a> verfasst, und bitten dich, es dir zu Gemüte zu führen. Falls etwas im Manual ungeklärt bleibt, bitte <a href="#contact">unverzüglich melden</a>.',
    'Manual_Linktext' => 'User Manual online ansehen',

    'DryRun_Title' => 'Herumspielen mit Test-Daten',
    'DryRun_Intro' => 'Schon klar: Als Slam-Master hast du alle Hände voll zu tun, und kannst dich unmöglich noch um Software-Evaluationen kümmern. Deshalb haben wir eine Datei mit Test-Daten vorbereitet, damit du nicht zuerst eine Test-Veranstaltung und zwei Test-Runden und fünf Test-Zwischenrunden und 15 Test-Slammer und 800 Test-Noten eingeben musst.',
    'DryRun_ListTitle' => 'Das geht so:',
    'DryRun_ListItem01' => 'SSB in Betrieb nehmen (siehe <a href="#installation">Inbetriebnahme</a>)',
    'DryRun_ListItem02' => 'Auf der Startseite auf «<b>Daten aus Datei laden</b>» klicken',
    'DryRun_ListItem03' => 'Datei im Verzeichnis <code>[[Pfad-zu-deinem-SSB-Download]]/SlamScoreBoard/saved_slams/test1.ssb</code> auswählen.',
    'DryRun_ListItem04' => 'Die Test-Daten sind nun geladen. Du darfst sie beliebig verändern und herumspielen. Wenn du auf den Geschmack gekommen bist, und gerne selber von vorne starten willst, kannst du auf «<b>Alles ratzfatz löschen</b>» klicken, um die geladenen Daten wieder loszuwerden.',

    'License_Title' => 'Lizenz und Nutzungsbedingungen',
    'License_Note01' => 'SSB ist Open Source und läuft unter der <a href="https://tldrlegal.com/license/mit-license">MIT-Lizenz</a>. Das heisst, kurz zusammengefasst, dass du SSB gratis benutzen darfst, sooft du willst,uns aber nicht verklagen kannst, wenn etwas schief läuft.',
    'License_Note02' => 'Die MIT-Lizenz regelt das Rechtliche. Zusätzlich haben wir eine weitere fakultative Anforderung an die Benutzung des Tools: Schreib uns doch einige Tage vor dem Slam, dass du SSB einsetzen willst, damit wir den Anlass auf unsere Referenzliste setzen können und unsere Seele sich mit Stolz erfüllt. Ausserdem freuen wir uns über Einladungen zu Slam-Veranstaltungen und/oder über ein Gratis-Bier. Sehr hilfreich für die erfolgreiche Weiterentwicklung des Tools ist auch Feedback nach der Veranstaltung. Am besten mit Foto! Am besten mit Foto, wo im Vordergrund der Sieger mitten in der Performance und im Hintergrund das SlamScoreBoard zu sehen ist.',

    'Ref_Title' => 'Veranstaltungen, die SSB eingesetzt haben',
    'Ref_Item01' => '<strong>April 2015</strong>: Schweizermeisterschaften 2015 im Schiffbau in Zürich (<a href="https://www.facebook.com/poetryslamzuerich">link</a>)',
    'Ref_Item02' => '<strong>Oktober 2015</strong>: Wild Word Wallis im Zeughaus in Brig (<a href="https://www.facebook.com/perronslam">link</a>)',
    'Ref_Item03' => '<strong>März 2016</strong>: Schweizermeisterschaften 2016 in 3 Locations in St. Gallen (<a href="http://slamgallen.ch/schweizermeisterschaften-2016">link</a>) [geplant]',

    'Ref_FakeItem01' => 'Super-Slam in der Allianz-Arena, München (Angefragt)',
    'Ref_FakeItem02' => 'Power-Slam im Stade de France, St-Denis (Angefragt)',
    'Ref_FakeItem03' => 'Mega-Slam im Madison Square Garden, New York (Angefragt)',
    'Ref_YourSlam' => 'Dein Slam? Bitte melde es uns, falls du SSB benutzten willst oder benutzt hast. Wir freuen uns sehr darüber.',

    'Contact_Title' => 'Kontakt',
    'Word_And' => 'und',
    'Contact_Text02' => 'Falls du das Tool verbesserst, zögere nicht, die Änderungen als Pull Request in den <a href="https://github.com/bespr/SlamScoreBoard">Github-Master-Branch</a> zurückzuspielen.',

    'Twitter_Title' => 'Ganz aktuelles Zeugs via Twitter',

);