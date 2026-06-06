/* =====================================================================
   BeatSyncToolkit Documentation - full page guide content (EN + TR)
   Long-scroll, tutorial-style pages. Helpers + reference data arrays
   feed the "Settings reference" tables at the end of each page.
   ===================================================================== */
const _ic = {
  tip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c.6.6 1 1.4 1 2h6c0-.6.4-1.4 1-2A7 7 0 0 0 12 2z"/></svg>',
  note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/></svg>',
  crit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>'
};
function call(type, title, body){
  return '<div class="callout '+type+'"><div class="ic">'+_ic[type]+'</div><div class="bd"><b>'+title+'</b>'+body+'</div></div>';
}
function tbl(heads, rows){
  return '<div class="tbl-wrap"><table><tr>'+heads.map(h=>'<th>'+h+'</th>').join('')+'</tr>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</table></div>';
}
function settingRows(items, lang){
  return tbl([lang==='tr'?'Ayar / API':'Setting / API', lang==='tr'?'Ne işe yarar?':'What it does', lang==='tr'?'Nasıl düşünmelisin?':'How to think about it'],
    items.map(x=>['<code>'+x[0]+'</code>', lang==='tr'?x[2]:x[1], lang==='tr'?x[4]:x[3]]));
}
function cards(items, lang){
  return '<div class="setting-grid">'+items.map(x=>'<div class="setting-card"><h4>'+x[0]+'</h4><p>'+(lang==='tr'?x[2]:x[1])+'</p></div>').join('')+'</div>';
}
function code(src){ return '<pre data-code="C#">\n'+src.trim()+'\n</pre>'; }
function ex(body){ return '<div class="music-example">'+body+'</div>'; }

const conductorSettings = [
 ['activeProfile','Music profile containing the score data: states, tracks, sections, layers and stingers.','Müzik verisini taşıyan profil: state, track, section, katman ve stingerlar.','The Conductor cannot play a score if no score book is assigned.','Conductor, elinde partisyon defteri yoksa müziği yönetemez.'],
 ['autoStartState','State name used when auto-start or StartMusic without a state needs a default.','Auto-start veya state verilmeden StartMusic çağrıldığında kullanılacak state adı.','Use a real gameplay mood such as Explore, Menu or Hub.','Explore, Menu veya Hub gibi gerçek oyun modunu yaz.'],
 ['startOnBeginPlay','Starts music automatically in Start.','Start sırasında müziği otomatik başlatır.','Turn off when a loading flow or game manager decides timing.','Başlangıç zamanına loading flow veya game manager karar verecekse kapat.'],
 ['startFadeDuration','Default fade used when music starts.','Müzik başlarken kullanılan varsayılan fade.','0 is immediate; short fades feel polished for scene entry.','0 anında başlatır; kısa fade sahne girişini daha temiz hissettirir.'],
 ['stopFadeDuration','Default fade used when music stops.','Müzik dururken kullanılan varsayılan fade.','Use longer values for calm exits, shorter for hard cuts.','Sakin çıkışta uzun, sert kesitte kısa kullan.'],
 ['baseVolume','Master multiplier for base tracks, sections, layers and ducking.','Base track, section, layer ve ducking için genel çarpan.','Treat it like the toolkit music bus volume.','Toolkitin müzik bus volumeu gibi düşün.'],
 ['quantizeStateChangesToBar','Makes normal state changes wait for the next bar by default.','Normal state değişimlerini varsayılan olarak sonraki bara bekletir.','On feels composed; off feels immediate.','Açıkken bestelenmiş, kapalıyken daha ani hisseder.'],
 ['queueSectionChangesToValidExit','Queues manual section jumps until a valid exit point.','Manuel section geçişlerini geçerli çıkış noktasına sıraya alır.','Keep on for musical phrasing; disable only for debug or emergency jumps.','Müzikal cümle için açık tut; sadece debug/acil geçişte kapat.'],
 ['defaultCrossfadeDuration','Fallback crossfade for tracks, branches, layers and stingers using -1.','-1 kullanan track, branch, layer ve stingerlar için yedek crossfade.','This is the house fade length for the score.','Skorun genel fade uzunluğu gibi davranır.'],
 ['resumeInterruptedBed','Resumes a track still fading out instead of restarting it from the beginning.','Hâlâ fade-out yapan bir tracki baştan başlatmak yerine kaldığı yerden devam ettirir.','Keeps nested zone in/out seamless during the crossfade window; applies to base-clip tracks. Leave on.','İç içe zone gir/çıkını crossfade penceresinde kesintisiz tutar; base-clip trackler için geçerli. Açık bırak.'],
 ['debugLog','Logs important runtime actions.','Önemli runtime işlemlerini Consolea yazar.','Use while wiring the system; turn off for clean logs.','Entegrasyonda aç, temiz log için kapat.'],
 ['stingerVolume','Default volume for direct stingers.','Doğrudan stingerlar için varsayılan ses.','Balance one-shot accents against the music bed.','Tek seferlik vurguları müzik yatağına göre dengele.'],
 ['defaultStingerFadeIn','Default fade-in for stingers when cue fade is -1.','Cue fade -1 ise stinger için varsayılan fade-in.','Percussive hits can be 0; swells may need a fade.','Vurmalı hit 0 olabilir; swell daha yumuşak fade isteyebilir.'],
 ['duckingTargetVolume','Music volume while ducking is active.','Ducking aktifken müzik sesi.','0.3 means music drops to 30 percent under dialogue.','0.3, diyalog altında müziğin yüzde 30a düşmesi demektir.'],
 ['duckingFadeIn / duckingFadeOut','Fade times for entering and leaving ducking.','Ducking başlama ve bitiş fade süreleri.','Fast in, slower out is common for speech clarity.','Konuşma netliği için hızlı giriş, daha yavaş çıkış yaygındır.'],
 ['duckLayers','Whether layer/stem sources duck with the base music.','Katman/stem kaynakları base müzikle birlikte kısılsın mı.','Turn off only if selected stems must remain present.','Sadece bazı stemler önde kalmalıysa kapat.'],
 ['duckStingers','Whether stinger one-shots duck with the base music.','Tek seferlik stingerlar base müzikle birlikte kısılsın mı.','Off keeps accents in front; on keeps dialogue ducking fully clean.','Kapalıyken vurgular önde kalır; açıkken diyalog duckingi tamamen temiz kalır.'],
 ['preloadAudioDataOnStart','Warms profile audio after Start to reduce first-play hitches.','İlk çalma takılmasını azaltmak için profil seslerini Start sonrası ısıtır.','Useful for larger profiles where first reaction must be smooth.','İlk tepkinin pürüzsüz olması gereken büyük profillerde kullanışlıdır.'],
 ['precreateLayerSourcesOnStart','Creates layer AudioSource pools gradually.','Layer AudioSource havuzlarını kademeli oluşturur.','Spreads setup work instead of paying all at first layer use.','İlk layer kullanımında tek seferde maliyet ödemek yerine işi yayar.'],
 ['prepareMutedLayersOnTrackStart','Schedules muted stems at track start for sample sync.','Sample sync için sessiz stemleri track başında schedule eder.','Keep on for stem music; this is the sync-safe path.','Stemli müzikte açık tut; senkron için güvenli yoldur.'],
 ['profileWarmupItemsPerFrame','Number of warmup items processed per frame.','Kare başına işlenen warmup öğesi sayısı.','Higher warms faster; lower spreads cost.','Yüksek değer hızlı ısıtır; düşük değer maliyeti yayar.'],
 ['startOnBeginPlayDelayFrames','Frames to wait before auto-start.','Auto-start öncesi beklenecek kare sayısı.','A small delay lets Unity audio settle after scene load.','Kısa gecikme, sahne yüklenince Unity sesinin oturmasını sağlar.'],
 ['loopIfSingleTrack','Loops a state with one track.','Tek trackli statei loop eder.','Usually on for normal game music beds.','Normal oyun müzik yatağı için genelde açık.'],
 ['autoAdvancePlaylist','Moves to another track when current one finishes.','Mevcut track bitince başka tracke geçer.','Use for states that contain multiple songs.','Bir state içinde birden fazla parça varsa kullan.'],
 ['autoAdvanceShuffle','Chooses a random next track.','Sonraki tracki rastgele seçer.','Good for exploration variety; avoid when exact order matters.','Keşif çeşitliliği için iyi; sıra önemliyse kapat.'],
 ['defaultStartTrackIndex','Default track index when no request/zone specifies one.','Request/zone özel track belirtmediğinde varsayılan track indexi.','Use 0 for normal first track, or pick a curated entry cue.','Normalde 0 kullan; özel giriş cue varsa onu seç.'],
 ['autoAdvanceDelayMin / autoAdvanceDelayMax','Delay range before playlist auto-advance.','Playlist auto-advance öncesi gecikme aralığı.','Adds breathing room between songs; min and max create the random wait window.','Şarkılar arasına nefes alanı koyar; min ve max rastgele bekleme aralığını oluşturur.'],
 ['activeIntensityProfile','Default profile for intensity-driven layers.','Intensity ile sürülen katmanlar için varsayılan profil.','Use one shared rule set unless tracks need overrides.','Trackler özel kural istemiyorsa ortak kural seti kullan.'],
 ['quantizeIntensityChanges','Waits until next bar before intensity layer changes.','Intensity layer değişimlerini sonraki bara bekletir.','Makes energy changes land musically.','Enerji değişimlerini müzikal yere düşürür.'],
 ['smoothIntensitySpeed','Default speed for smooth intensity changes.','Yumuşak intensity değişimi için varsayılan hız.','Higher follows gameplay faster; lower feels more musical.','Yüksek değer gameplayi hızlı takip eder; düşük değer daha müzikal akar.'],
 ['intensityLayerFadeOverride','Fade override for intensity-driven layer volume changes.','Intensity ile sürülen layer volume değişimleri için fade override.','-1 keeps layer/default fades; 0 makes intensity layer response instant.','-1 layer/default fade kullanır; 0 intensity layer tepkisini anlık yapar.'],
 ['resetIntensityOnStateChange','Resets global intensity to 0 whenever a state transition rebuilds the music bed.','State geçişi müzik yatağını yeniden kurduğunda global intensity değerini 0 yapar.','Keep on for legacy behavior; turn off when danger/pressure should survive state changes.','Eski davranış için açık tut; tehlike/baskı state geçişlerinde korunmalıysa kapat.'],
 ['defaultLayerMode','Fallback layer behavior when a track uses conductor default.','Track conductor defaultunu kullanınca yedek layer davranışı.','Prefer track-local defaults for most projects.','Çoğu projede tracke özel default daha nettir.'],
 ['defaultActiveLayers','Layer names enabled when conductor default mode is CustomList.','Conductor default mode CustomList iken açılan layer isimleri.','Useful for shared/global stems.','Ortak/global stemler için kullanışlıdır.'],
 ['defaultLayers','Advanced shared/global layer definitions.','Gelişmiş ortak/global layer tanımları.','Prefer track-local layers unless you truly share stems across tracks.','Stemler trackler arasında gerçekten ortak değilse track-local kullan.']
];

const trackSettings = [
 ['stingerCues','Named one-shot cues available through BST.PlayStinger.','BST.PlayStinger ile çağrılan isimli tek seferlik cue listesi.','Use for victory hits, alert stabs and objective accents.','Zafer hitleri, alarm vurguları ve görev aksanları için kullan.'],
 ['stateConfigs','List of named music states.','İsimli müzik stateleri listesi.','State is the game mood: Explore, Combat, Boss, Menu.','State oyun ruh halidir: Explore, Combat, Boss, Menu.'],
 ['stateName','Gameplay-facing state name.','Gameplayin gördüğü state adı.','Treat it as an API constant; spelling matters.','API sabiti gibi düşün; yazım birebir önemlidir.'],
 ['tracks','Tracks available inside a state.','State içindeki trackler.','One track is one song/cue; many tracks create a playlist.','Tek track bir şarkı/cuedur; çok track playlist olur.'],
 ['trackName','Name shown in UI and used by track-aware rules.','UIde görünen ve track-aware kurallarda kullanılan ad.','Give it a musical name such as Explore_A or Boss_Phase2.','Explore_A veya Boss_Phase2 gibi müzikal bir ad ver.'],
 ['baseClip','Full-mix clip for non-section tracks.','Section kullanmayan trackler için full-mix klip.','The fastest path for a working music state.','Çalışan müzik statei için en hızlı yol.'],
 ['bpm','Track tempo used for beat/bar timing.','Beat/bar zamanlaması için track temposu.','Wrong BPM makes perfect code sound late or early.','Yanlış BPM kusursuz kodu bile erken/geç duyurur.'],
 ['beatsPerBar','Number of beats in one bar.','Bir bardaki beat sayısı.','Usually 4, but 3/4 and 5/4 music must match.','Genelde 4; 3/4 ve 5/4 müzikte doğru girilmelidir.'],
 ['layers','Track-local stem definitions.','Tracke özel stem tanımları.','Define the instruments this track can add/remove.','Bu trackin ekleyip çıkarabileceği enstrümanları tanımlar.'],
 ['defaultLayerMode','Layer behavior when track starts.','Track başladığında layer davranışı.','MutedOnly starts lean; AllAvailable starts full; CustomList is curated.','MutedOnly sade, AllAvailable dolu, CustomList seçilmiş başlatır.'],
 ['trackDefaultLayers','Layer names enabled by CustomList.','CustomList ile açılan layer isimleri.','Use for a composed starting arrangement.','Bestelenmiş başlangıç aranjmanı için kullan.'],
 ['intensityOverrideMode','Chooses conductor, profile override, or custom rules.','Conductor, profil override veya özel kuralları seçer.','Use overrides when one track needs its own energy curve.','Bir track kendi enerji eğrisine ihtiyaç duyuyorsa override kullan.'],
 ['trackIntensityProfile','Profile used by UseProfileOverride.','UseProfileOverride tarafından kullanılan profil.','Good when multiple tracks share a special intensity map.','Birden fazla track özel intensity haritasını paylaşıyorsa iyi.'],
 ['customIntensityRules','Track-local intensity thresholds.','Tracke özel intensity eşikleri.','Use when the rule belongs only to this track.','Kural sadece bu tracke aitse kullan.'],
 ['useSections','Uses section list instead of baseClip.','baseClip yerine section listesini kullanır.','Turn on for intro-loop-bridge-outro forms.','Intro-loop-bridge-outro formları için aç.'],
 ['entrySectionIndex','Section index where the track begins.','Trackin başlayacağı section indexi.','Usually intro index, but can start directly on loop.','Genelde intro indexi; istersen direkt loop da olabilir.'],
 ['sections','Musical blocks used by section tracks.','Section tracklerin kullandığı müzikal bloklar.','This is horizontal song form.','Bu yatay şarkı formudur.']
];

const layerSettings = [
 ['layerName','Layer name used by gameplay, zones, sections and intensity rules.','Gameplay, zone, section ve intensity kurallarının kullandığı layer adı.','This is the stem name your game speaks.','Oyunun konuştuğu stem adı budur.'],
 ['clip','Audio clip for the stem.','Stem için audio clip.','Export from the same DAW start/end as the base track.','Base track ile aynı DAW başlangıç/bitişinden export et.'],
 ['targetVolume','Full audible volume before base volume and ducking.','Base volume ve ducking öncesi tam duyulan ses.','Balance the stem here before gameplay fades it.','Gameplay fadeinden önce stem balansını burada ayarla.'],
 ['standbyVolume','Silent standby volume for prepared muted layers.','Hazırlanmış sessiz layerlar için standby sesi.','Keep around 0.00-0.01 so sync is ready but inaudible.','Senkron hazır ama duyulmaz kalsın diye 0.00-0.01 civarında tut.'],
 ['fadeInDuration','Fade duration when enabling the layer. -1 inherits conductor.','Layer açılırken fade süresi. -1 conductoru miras alır.','Short for drums, longer for pads and ambience.','Davulda kısa, pad/ambience için uzun kullan.'],
 ['fadeOutDuration','Fade duration when disabling the layer. -1 inherits conductor.','Layer kapanırken fade süresi. -1 conductoru miras alır.','Longer fade-outs prevent musical holes.','Daha uzun fade-out müzikal boşlukları azaltır.']
];

const sectionSettings = [
 ['sectionName','Name used by JumpToSectionByName and the panel.','JumpToSectionByName ve panelin kullandığı ad.','Use musical names: Intro, Loop, Bridge, Outro, Phase2.','Intro, Loop, Bridge, Outro, Phase2 gibi müzikal ad kullan.'],
 ['audioClip','Audio for this section.','Bu sectionın sesi.','This is a song block, not a stinger.','Bu şarkı bloğudur, stinger değildir.'],
 ['bpmOverride','Optional BPM for this section. 0 inherits track BPM.','Bu section için opsiyonel BPM. 0 track BPMini miras alır.','Only override when the section truly changes tempo.','Sadece section gerçekten tempo değiştiriyorsa override et.'],
 ['beatsPerBarOverride','Optional beats per bar. 0 inherits track value.','Opsiyonel beats per bar. 0 track değerini miras alır.','Use for meter changes inside a cue.','Cue içinde ölçü değişimi varsa kullan.'],
 ['canLoop','Allows this section to loop.','Bu sectionın loop yapmasına izin verir.','Main loop sections usually enable this.','Ana loop sectionları genelde bunu açar.'],
 ['maxLoopCount','Maximum loops; -1 means infinite.','Maksimum loop sayısı; -1 sonsuz.','Use finite loops for intros that should eventually move on.','Bir süre sonra ilerlemesi gereken intro için sınırlı loop kullan.'],
 ['isTransitionPoint','Marks the whole section as a valid transition point.','Tüm sectionı geçerli transition point yapar.','Useful for outro or clean cadence sections.','Outro veya temiz kadans sectionları için kullanışlı.'],
 ['useBarExitPoints','Allows exits on specific section-local bars.','Belirli section-içi barlarda çıkışa izin verir.','This is for phrases with multiple good exit doors.','Birden çok iyi çıkış kapısı olan cümleler içindir.'],
 ['validExitBars','1-based local bars where exits are valid.','Çıkışın geçerli olduğu 1 tabanlı local barlar.','Bar 5 means the start of the fifth bar in this section.','5, bu sectiondaki beşinci barın başlangıcı demektir.'],
 ['branches','Conditional routing evaluated at exits.','Çıkışlarda değerlendirilen koşullu yönlendirme.','Branches decide where the music goes next.','Müziğin sonra nereye gideceğine branch karar verir.'],
 ['defaultNextSection','Fallback target when no branch wins; -1 lets track finish.','Branch kazanmazsa yedek hedef; -1 trackin bitmesine izin verir.','Self-loop by pointing back to the same section.','Aynı sectiona dönerek self-loop kur.'],
 ['autoEnableLayers','Layers enabled when this section starts.','Bu section başlayınca açılan layerlar.','Great for arrangement changes tied to form.','Forma bağlı aranjman değişimleri için iyi.'],
 ['autoDisableLayers','Layers disabled when this section starts.','Bu section başlayınca kapanan layerlar.','Use to thin the mix for breakdowns or endings.','Breakdown veya ending için miks inceltmede kullan.']
];

const branchSettings = [
 ['label','Readable name for debugging and authoring.','Debug ve authoring için okunur ad.','Name the musical reason: GoToBossLoop, ExitWhenCalm.','Müzikal nedeni adlandır: GoToBossLoop, ExitWhenCalm.'],
 ['priority','Higher priority branches are evaluated first.','Yüksek priority önce değerlendirilir.','Specific rules should beat general fallback rules.','Özel kurallar genel fallbackten önce gelmeli.'],
 ['conditions','All conditions must pass for the branch to win.','Branchin kazanması için tüm koşullar geçmeli.','Empty conditions behave like Always.','Boş koşullar Always gibi davranır.'],
 ['targetSectionIndex','Section index to play when branch wins.','Branch kazanınca çalınacak section indexi.','Set the musical destination.','Müzikal hedefi seçer.'],
 ['crossfadeToTarget','Crossfades into the target instead of hard switching.','Hedefe sert geçmek yerine crossfade yapar.','Use when clips overlap well; avoid if the phrase needs a clean cut.','Klipler iyi örtüşüyorsa kullan; cümle temiz kesit istiyorsa kapat.'],
 ['crossfadeDuration','Crossfade time for this branch.','Bu branch için crossfade süresi.','Short for rhythmic moves, longer for pads.','Ritmik geçişte kısa, padlerde uzun.'],
 ['addLayersOnBranch','Layers forced on when branch wins.','Branch kazanınca açılan layerlar.','A branch can change destination and arrangement together.','Branch hem hedefi hem aranjmanı değiştirebilir.'],
 ['removeLayersOnBranch','Layers forced off when branch wins.','Branch kazanınca kapanan layerlar.','Useful for removing tension layers on calm exits.','Sakin çıkışta tension layerlarını kapatmak için iyi.']
];

const conditions = [
 ['StateEquals / StateNotEquals','Checks current state name.','Mevcut state adını kontrol eder.','Use for routing that depends on the global mood.','Global moda bağlı yönlendirme için kullan.'],
 ['IntensityAbove / IntensityBelow','Checks current intensity value.','Mevcut intensity değerini kontrol eder.','Good for branching to high-energy or low-energy loops.','Yüksek/düşük enerji looplarına dallanmak için iyi.'],
 ['LayerActive / LayerInactive','Checks whether a layer is active.','Bir layer aktif mi kontrol eder.','Use when arrangement state should drive form.','Aranjman durumu formu etkileyecekse kullan.'],
 ['TrackLocked / TrackNotLocked','Checks track lock state.','Track kilidi durumunu kontrol eder.','Useful when zones or boss phases pin a track.','Zone veya boss phase tracki sabitliyorsa kullanışlıdır.'],
 ['CustomFlag','Checks a boolean set by BST.SetCustomFlag.','BST.SetCustomFlag ile ayarlanan booleanı kontrol eder.','Use for story, puzzle solved, low health or boss phase flags.','Hikaye, puzzle çözüldü, düşük can veya boss phase bayrakları için kullan.'],
 ['LoopCountAbove','Checks how many times current section looped.','Mevcut sectionın kaç kere loop ettiğini kontrol eder.','Lets an intro loop twice before moving on.','Bir intronun iki kez loop edip sonra ilerlemesini sağlar.'],
 ['Always','Always passes.','Her zaman geçer.','Use as final fallback branch.','Son fallback branch olarak kullan.']
];

const intensitySettings = [
 ['layerName','Layer controlled by this intensity rule.','Bu intensity kuralının kontrol ettiği layer.','Name must match a track layer.','İsim track layerı ile eşleşmeli.'],
 ['volumeScalarCurve','Optional volume curve evaluated by intensity.','Intensity ile değerlendirilen opsiyonel volume curve.','Use when layer should swell gradually instead of on/off.','Layer aç/kapa yerine kademeli yükselsin istiyorsan kullan.'],
 ['thresholdOn','Intensity value where the layer turns on.','Layerın açıldığı intensity değeri.','Example: drums enter at 0.65.','Örnek: davul 0.65te girer.'],
 ['thresholdOff','Intensity value where the layer turns off.','Layerın kapandığı intensity değeri.','Usually lower than thresholdOn to avoid flicker.','Titremeyi önlemek için genelde thresholdOndan düşüktür.'],
 ['useHysteresis','Uses thresholdOn and thresholdOff as a stable gap.','thresholdOn ve thresholdOffu stabil aralık olarak kullanır.','Keep on for gameplay values that move constantly.','Sürekli oynayan gameplay değerleri için açık tut.']
];

const zoneSettings = [
 ['overrideProfile','Optional profile while this zone is active.','Zone aktifken opsiyonel profil override.','Use for a region with a different music set.','Farklı müzik seti olan bölge için kullan.'],
 ['zoneState','State requested while inside the zone.','Zone içindeyken istenen state.','Leave empty if the zone only changes layers or intensity.','Zone sadece layer/intensity değiştirecekse boş bırak.'],
 ['zoneStartTrackIndex','Track index to start in the target state; -1 uses default.','Hedef statede başlanacak track indexi; -1 varsayılan.','Use for rooms that must start on a specific cue.','Belirli cue ile başlaması gereken odalarda kullan.'],
 ['zonePriority','Higher priority zones win when overlapping.','Üst üste zone varsa yüksek priority kazanır.','Small area inside big area should have higher priority.','Büyük alan içindeki küçük alan daha yüksek priority almalı.'],
 ['extraLayers','Layer names forced while the zone is active.','Zone aktifken zorlanan layer adları.','Use for room tone, weather, crowd, danger color or local instrumentation.','Oda tonu, hava, kalabalık, tehlike rengi veya yerel enstrüman için kullan.'],
 ['layerRules','Track-aware layer rules.','Track-aware layer kuralları.','Use when different tracks need different zone layers.','Farklı trackler farklı zone layerları istiyorsa kullan.'],
 ['zoneTransitionMode','Timing for the zone state change (and layers when Layer Timing follows it).','Zone state değişiminin zamanlaması (Layer Timing buna uyduğunda layerlar da).','OnNextBar is safe; OnNextTransitionPoint reads validExitBars, transition-point sections and section-end fallback.','OnNextBar güvenli; OnNextTransitionPoint validExitBars, transition-point sectionlar ve section-end fallback okur.'],
 ['zoneLayerTiming','Separate timing for the zone forced layers.','Zone zorlanan layerları için ayrı zamanlama.','Follow State reuses the mode above; or time layers on their own, e.g. switch state Immediate but open the layer OnSectionEnd.','Follow State üstteki modu kullanır; ya da layerları bağımsız zamanla, örn. state Immediate ama layer OnSectionEnd.'],
 ['zoneEnterDebounceTime','Delay before the zone takes over on entry.','Girişte zone devralmadan önce gecikme.','A quick pass-through (flicking through a nested zone) will not change the music. 0 is instant entry.','Hızlı geçiş (iç içe zoneden değip geçme) müziği değiştirmez. 0 anında giriş.'],
 ['zoneDebounceTime','Delay before committing exit.','Çıkışı kesinleştirmeden önce gecikme.','Prevents flicker at trigger edges.','Trigger kenarında titremeyi önler.'],
 ['zoneTrackLock','Locks current track while zone is active.','Zone aktifken mevcut tracki kilitler.','Use when the room must hold its cue.','Oda kendi cueunu tutmalıysa kullan.'],
 ['localPlayerTag','Optional tag filter.','Opsiyonel tag filtresi.','Usually Player; empty allows any collider.','Genelde Player; boşsa her collider tetikler.'],
 ['zoneIntensityProfile','Optional intensity profile while zone is active.','Zone aktifken opsiyonel intensity profili.','Use for area-specific energy rules.','Alana özel enerji kuralları için kullan.'],
 ['boxSize','Size of the BoxCollider trigger.','BoxCollider trigger boyutu.','Match the musical space, not just visual geometry.','Sadece görsele değil müzikal alana göre ayarla.'],
 ['showPreviewBox','Shows translucent preview box while editing.','Editörde yarı saydam preview kutusunu gösterir.','Useful while authoring zone size and placement.','Zone boyutu ve yerleşimini yazarken kullan.'],
 ['showPreviewBoxInPlayMode','Keeps the preview box visible in Play Mode.','Play Mode sırasında preview kutusunu görünür tutar.','Turn off for shipped gameplay; leave on for demo/debug rooms.','Yayın gameplayinde kapat; demo/debug odalarında açık bırak.'],
 ['previewColor','Per-zone color and transparency of the preview box.','Preview kutusunun zone-özel rengi ve saydamlığı.','Each zone is tinted independently, so changing one never affects the others.','Her zone bağımsız renklenir; birini değiştirmek diğerlerini etkilemez.'],
 ['showWorldLabel','Shows the world-space zone label while editing.','Editörde world-space zone labelini gösterir.','Use so designers can identify zone intent in the scene.','Designer sahnede zone niyetini görebilsin diye kullan.'],
 ['showWorldLabelInPlayMode','Keeps the zone label visible in Play Mode.','Play Mode sırasında zone labelini görünür tutar.','Turn on for tutorial/demo scenes; turn off for normal gameplay.','Tutorial/demo sahnelerinde aç; normal gameplayde kapat.']
];

const zoneWorldLabelSettings = [
 ['localOffset','Local offset from the zone object to the label.','Zone objesinden label’a lokal offset.','Place text above or beside the volume so designers can identify it in scene view.','Designer sahnede tanısın diye metni hacmin üstüne veya yanına koy.'],
 ['faceRotation','Fixed local euler rotation for the label.','Label için sabit lokal euler rotasyon.','The label does not follow the camera; rotate it like world text.','Label kamerayı takip etmez; world text gibi döndür.'],
 ['textColor','Color of the zone label text.','Zone label metin rengi.','Each zone is independent; use high contrast against the scene.','Her zone bağımsız; sahneye karşı yüksek kontrast kullan.'],
 ['labelScale','Overall world size of the label.','Labelın genel dünya boyutu.','Counter-scales the zone so text stays this size regardless of zone scale; increase for bigger text.','Zone ölçeğinden bağımsız bu boyutta kalsın diye zonu ters-ölçekler; büyütmek için artır.']
];

const panelSettings = [
 ['visible','Whether the panel is currently shown.','Panelin şu an görünür olup olmadığı.','Use SetVisible from your own input if needed.','Gerekirse kendi inputundan SetVisible çağır.'],
 ['enableKeyboardToggle','Keyboard toggle for the panel.','Panel için klavye toggleı.','Works with the legacy Input Manager and the new Input System (Tab on the new Input System).','Eski Input Manager ve yeni Input System ile çalışır (yeni Input Systemde Tab).'],
 ['toggleKey','Key for the legacy toggle.','Legacy toggle tuşu.','Default Tab is easy during testing; the new Input System uses Tab.','Varsayılan Tab testte rahattır; yeni Input System Tab kullanır.'],
 ['useFullscreenLayout','Makes panel a full-screen control surface.','Paneli tam ekran kontrol yüzeyi yapar.','Good for deep music testing.','Derin müzik testi için iyi.'],
 ['fallbackLayers','Layer buttons if track exposes no layer list.','Track layer listesi sunmuyorsa layer butonları.','Useful for testing conductor/global layers.','Conductor/global layer testinde işe yarar.'],
 ['layerAddMode','ManualOverride or PreserveIntensity for panel adds.','Panel layer eklemeleri için ManualOverride veya PreserveIntensity.','ManualOverride always pins the layer. PreserveIntensity only preserves ownership if that layer is already intensity-controlled right now.','ManualOverride layerı her zaman pinler. PreserveIntensity sadece layer şu anda intensity-controlled ise sahipliği korur.'],
 ['quantizeStateChanges','Panel state changes use musical timing.','Panel state değişimleri müzikal zaman kullanır.','Keep on when testing real gameplay flow.','Gerçek gameplay akışını test ederken açık tut.']
];

panelSettings.push(
 ['lockCursorWhenHidden','Locks and hides the cursor while the panel is hidden.','Panel gizliyken cursoru kilitler ve gizler.','Turn off if your own input system owns cursor state.','Cursor durumunu kendi input sistemin yönetiyorsa kapat.'],
 ['panelRect','Window rectangle used by compact layout.','Kompakt layout tarafından kullanılan pencere alanı.','Use only when fullscreen layout is off.','Sadece fullscreen layout kapalıyken kullan.'],
 ['drawOpaqueBackdrop','Draws a dark backdrop behind fullscreen controls.','Tam ekran kontrollerin arkasına koyu zemin çizer.','Keep on for readability in bright scenes.','Parlak sahnelerde okunurluk için açık tut.'],
 ['startStateName','State used by the panel Start Music button.','Panel Start Music butonunun kullandığı state.','Leave empty to let the conductor choose its normal start state.','Conductor normal başlangıç state’ini seçsin istiyorsan boş bırak.'],
 ['stateTransitionMode','Transition mode used by panel state buttons.','Panel state butonlarının kullandığı transition modu.','Use OnNextTransitionPoint to test authored section exits during state changes.','State değişimlerinde yazılmış section exit’lerini test etmek için OnNextTransitionPoint kullan.'],
 ['trackTransitionMode','Transition mode used by panel track jump buttons.','Panel track jump butonlarının kullandığı transition modu.','Use OnSectionEnd or OnNextTransitionPoint when jumping from a section track to another track in the same state.','Section track’ten aynı state içinde başka track’e atlarken OnSectionEnd veya OnNextTransitionPoint kullan.'],
 ['stateCrossfadeDuration / trackCrossfadeDuration','Panel crossfade overrides for state and track changes.','Panel state ve track değişimleri için crossfade override değerleri.','Use -1 to inherit conductor defaultCrossfadeDuration; use 0 for a hard cut; use explicit seconds to test OnSectionEnd pre-roll overlap.','-1 conductor defaultCrossfadeDuration miras alır; 0 sert kesit yapar; açık saniye değeri OnSectionEnd pre-roll overlap testinde kullanılır.'],
 ['startFadeDuration / stopFadeDuration','Panel fade overrides for start and stop.','Panel başlatma/durdurma fade override değerleri.','-1 inherits conductor start/stop fade defaults.','-1 conductor start/stop fade varsayılanlarını miras alır.'],
 ['forceStateWhileInZone','Panel state buttons can beat an active zone.','Panel state butonları aktif bölgeyi geçebilir.','Use only when testing scripted ownership.','Sadece scripted sahiplik testinde kullan.'],
 ['persistStateAfterLeavingZone','Stores the chosen state as post-zone fallback.','Seçilen state’i bölge sonrası fallback olarak saklar.','Keep on for normal state buttons.','Normal state butonları için açık tut.'],
 ['stateStartTrackIndex / stateStartSectionIndex','Optional track/section target for panel state changes.','Panel state değişimleri için opsiyonel track/section hedefi.','-1 means default track or the track entry section.','-1 varsayılan track veya track entry section demektir.'],
 ['quantizeLayerChanges','Panel layer changes wait for the bar.','Panel layer değişimleri barı bekler.','Keep on when auditioning real gameplay feel.','Gerçek gameplay hissini denerken açık tut.'],
 ['layerFadeInOverride / layerFadeOutOverride','Panel layer fade overrides.','Panel layer fade override değerleri.','-1 uses the layer/conductor fade rules.','-1 layer/conductor fade kurallarını kullanır.'],
 ['queueSectionChangesToValidExit','Panel section jumps wait for valid exits.','Panel section atlamaları geçerli çıkışı bekler.','This mirrors musical section authoring.','Müzikal section authoring davranışını yansıtır.'],
 ['crossfadeSectionChanges / sectionCrossfadeDuration','Panel section jump crossfade controls.','Panel section atlama crossfade kontrolleri.','Use -1 duration to inherit conductor crossfade.','Süreyi -1 bırakırsan conductor crossfade miras alınır.'],
 ['quantizeIntensityChanges','Panel intensity changes wait for the bar.','Panel intensity değişimleri barı bekler.','Use to hear energy changes musically.','Enerji değişimlerini müziksel duymak için kullan.'],
 ['smoothIntensityChanges','Panel intensity changes glide toward the target.','Panel intensity değişimleri hedefe doğru yumuşak akar.','When used with quantize, smoothing starts at the next bar.','Quantize ile birlikte kullanılınca smoothing sonraki barda başlar.'],
 ['intensitySmoothSpeed / intensitySmoothEasing','Panel smooth intensity shape.','Panel smooth intensity hızı ve eğrisi.','Use 0 speed to inherit the conductor smoothIntensitySpeed.','0 hız conductor smoothIntensitySpeed değerini miras alır.'],
 ['intensityLayerFadeOverride','Panel-only intensity layer fade override.','Sadece panel için intensity layer fade override değeri.','Use 0 to verify smooth is truly off; use -1 to hear authored/conductor fades.','Smooth gerçekten kapalı mı test etmek için 0; authored/conductor fade için -1 kullan.'],
 ['requestId / requestState / requestPriority','Single request editor fields.','Tek request düzenleme alanları.','Useful for quickly pushing one test request.','Tek test request’ini hızlı itmek için kullanışlı.'],
 ['quantizeRequests','Panel request switches use musical timing.','Panel request geçişleri müzik zamanlama kullanır.','Turn off only for hard debug cuts.','Sadece sert debug kesitlerinde kapat.'],
 ['requestSlots','Reusable no-code request test rows.','Yeniden kullanılabilir kodsuz request test satırları.','Model combat, low-health and cutscene ownership before wiring code.','Koda bağlamadan combat, düşük can ve cutscene sahipliğini modelle.'],
 ['duckTargetVolume / duckFadeTime','Panel ducking test values.','Panel ducking test değerleri.','Audition dialogue dips without writing gameplay.','Gameplay yazmadan diyalog kısma davranışını dene.'],
 ['Duck layers / Duck stingers','Panel toggles for what ducking affects.','Ducking’in neyi etkileyeceğini seçen panel toggle’ları.','Stingers stay in front by default unless Duck stingers is enabled.','Duck stingers açılmazsa stinger’lar varsayılan olarak önde kalır.']
);

const fadeInheritanceRows = [
 ['StartMusic(fadeDuration: -1)','Uses conductor startFadeDuration.','Conductor startFadeDuration kullanır.','Start fades are transport fades, not crossfades.','Başlatma fade’leri transport fade’idir, crossfade değildir.'],
 ['StopMusic(fadeDuration: -1)','Uses conductor stopFadeDuration.','Conductor stopFadeDuration kullanır.','Use explicit 0 for hard stops.','Sert duruş için açıkça 0 ver.'],
 ['State / track / section crossfade -1','Uses conductor defaultCrossfadeDuration.','Conductor defaultCrossfadeDuration kullanır.','Override per call for special moments.','Özel anlar için çağrı bazında override et.'],
 ['Layer fade -1','Uses layer fade if set, otherwise defaultCrossfadeDuration.','Layer fade ayarlıysa onu, değilse defaultCrossfadeDuration kullanır.','Author per-stem fades for drums, pads and impacts.','Davul, pad ve impact için stem başına fade yaz.'],
 ['Stinger fadeIn -1','Uses conductor defaultStingerFadeIn.','Conductor defaultStingerFadeIn kullanır.','This does not use the music crossfade.','Bu müzik crossfade ayarını kullanmaz.'],
 ['Ducking fadeTime -1','Uses duckingFadeIn or duckingFadeOut.','duckingFadeIn veya duckingFadeOut kullanır.','Start and stop can feel different.','Başlama ve bitirme farklı hissedebilir.']
];

const stateParameterRows = [
 ['transitionMode','Immediate, OnNextBar, OnSectionEnd, or OnNextTransitionPoint.','Immediate, OnNextBar, OnSectionEnd veya OnNextTransitionPoint.','Choose when the state change is allowed to land.','State değişiminin ne zaman oturacağını seçer.'],
 ['crossfadeDuration','State transition crossfade override; -1 inherits defaultCrossfadeDuration.','State geçiş crossfade override değeri; -1 defaultCrossfadeDuration miras alır.','Use 0 for a hard cut, short for hits, longer for pads.','Sert kesit için 0, vurgu için kısa, pad için uzun kullan.'],
 ['forceWhileInZone','Allows a state call to beat the active music zone.','State çağrısının aktif müzik bölgesini geçmesine izin verir.','Use for cutscenes or moments that must own the score.','Skoru kesin sahiplenmesi gereken cutscene/anlar için kullan.'],
 ['persistAfterLeavingZone','Stores this state as the global fallback after zones end.','Bölgeler bitince global fallback olarak bu state’i saklar.','Keep true for normal gameplay state changes.','Normal gameplay state değişimlerinde true tut.'],
 ['startTrackIndex','Optional track index inside the target state; -1 uses state defaults.','Hedef state içinde opsiyonel track index’i; -1 state varsayılanlarını kullanır.','Use when a state must begin on a specific cue.','State belirli cue ile başlamalıysa kullan.'],
 ['startSectionIndex','Optional starting section for section tracks; -1 uses entrySectionIndex.','Section track’ler için opsiyonel başlangıç section’ı; -1 entrySectionIndex kullanır.','Useful for skipping an intro or entering a phase directly.','Intro atlamak veya faza direkt girmek için kullanışlı.']
];

const conditionFieldRows = [
 ['conditionType','Selects which branch condition logic runs.','Hangi branch condition mantığının çalışacağını seçer.','This is where Always, StateEquals, IntensityAbove, LayerActive, CustomFlag and the other condition modes are chosen.','Always, StateEquals, IntensityAbove, LayerActive, CustomFlag ve diğer condition modları burada seçilir.'],
 ['StateEquals / StateNotEquals','targetStateName','targetStateName','Compares the current state name exactly.','Mevcut state adını birebir karşılaştırır.'],
 ['IntensityAbove / IntensityBelow','intensityThreshold','intensityThreshold','Above uses > and Below uses <.','Above >, Below < kullanır.'],
 ['LayerActive / LayerInactive','targetLayerName','targetLayerName','Checks the active layer set.','Aktif layer setini kontrol eder.'],
 ['TrackLocked / TrackNotLocked','none','yok','Reads manual or zone track lock.','Manuel veya zone track lock durumunu okur.'],
 ['CustomFlag','flagName + expectedFlagValue','flagName + expectedFlagValue','Reads a boolean set by BST.SetCustomFlag.','BST.SetCustomFlag ile ayarlanan boolean’ı okur.'],
 ['LoopCountAbove','loopCountThreshold','loopCountThreshold','Passes only when current loop count is greater than the threshold.','Sadece mevcut loop sayısı threshold değerinden büyükse geçer.'],
 ['Always','none','yok','Always passes; use as the final fallback.','Her zaman geçer; son fallback olarak kullan.']
];

const defaultLayerModeRows = [
 ['MutedOnly','Prepared layers play at standby volume until enabled.','Hazırlanan layer’lar açılana kadar standby volume seviyesinde çalar.','Best default for adaptive stem music.','Adaptif stem müziği için en iyi varsayılan.'],
 ['AllAvailable','All available layers start audible.','Tüm mevcut layer’lar duyulur başlar.','Use for full arrangement starts.','Dolu aranjman başlangıçları için kullan.'],
 ['CustomList','Only trackDefaultLayers start audible.','Sadece trackDefaultLayers duyulur başlar.','Use for a curated starting mix.','Seçilmiş başlangıç miksi için kullan.'],
 ['UseConductorDefault','Track uses conductor defaultLayerMode and defaultActiveLayers.','Track, conductor defaultLayerMode ve defaultActiveLayers kullanır.','Good for shared/global arrangements.','Ortak/global aranjmanlar için iyi.'],
 ['InheritFromPrevious','Legacy value normalized to MutedOnly during validation.','Legacy değer validation sırasında MutedOnly olur.','Do not build new authoring around it.','Yeni authoring için buna dayanma.']
];

const getterDefaultRows = [
 ['GetMusicStateName','Returns current state or null.','Mevcut state’i veya null döndürür.','Null means no conductor/state has resolved yet.','Null, henüz conductor/state çözülemedi demektir.'],
 ['GetCurrentTrackIndex / GetCurrentSectionIndex / GetPendingSectionIndex','Return -1 when unavailable.','Yoksa -1 döndürür.','Treat -1 as no current target.','-1 değerini mevcut hedef yok diye yorumla.'],
 ['GetCurrentSectionBar','Returns the current section-local bar, or 0 when sections are inactive.','Mevcut section-local bar değerini döndürür; section aktif değilse 0.','Use this for validExitBars debugging; GetCurrentBar is the global transport bar.','validExitBars debug’ı için bunu kullan; GetCurrentBar global transport bar’ıdır.'],
 ['GetCurrentTrackName / GetCurrentSectionName','Return an empty string when unavailable.','Yoksa boş string döndürür.','Safe for labels and debug UI.','Label ve debug UI için güvenlidir.'],
 ['List getters','Return empty lists when unavailable.','Yoksa boş liste döndürür.','Iterate without null checks.','Null kontrolü yapmadan dolaşabilirsin.'],
 ['GetBpm / GetCurrentBar / GetCurrentBeat / GetIntensity','Return 0 before a value exists.','Değer oluşmadan önce 0 döndürür.','Use with IsPlaying if 0 has gameplay meaning.','0 gameplay’de anlamlıysa IsPlaying ile birlikte kullan.']
];

const conductorEventRows = [
 ['StateChanged(string oldState, string newState)','Raised after the conductor changes state.','Conductor state değiştirdikten sonra tetiklenir.','Subscribe from a serialized conductor reference or BST.GetConductor().','Serialize edilmiş conductor referansından veya BST.GetConductor() ile abone ol.'],
 ['TrackChanged(string trackName)','Raised when the active track changes.','Aktif track değişince tetiklenir.','Good for debug UI or visual sync.','Debug UI veya görsel senkron için iyi.'],
 ['Bar() / Beat(int beat)','Raised by the conductor musical clock.','Conductor müzik saati tarafından tetiklenir.','Use for lightweight timing reactions, not heavy gameplay work.','Hafif timing tepkileri için kullan, ağır gameplay işi için değil.'],
 ['HasPendingStateTransition / GetPendingStateName / HasPendingTrackTransition / GetPendingTrackIndex / HasPendingSectionTransition','Expose queued musical transitions.','Sıradaki müzik geçişlerini gösterir.','Use these in debug UI to disable duplicate buttons while a state, track or section handoff is waiting for its musical boundary.','Bir state, track veya section handoff müzik sınırını beklerken debug UI butonlarını kilitlemek için kullan.'],
 ['IsDucking / DuckingMultiplier','Expose current ducking state.','Mevcut ducking durumunu gösterir.','Use for debug displays or audio UI.','Debug göstergeleri veya ses UI için kullan.']
];

const apiReferenceRows = [
 ['GetConductor()','Returns or creates the active conductor through the manager.','Manager üzerinden aktif conductor’u döndürür veya oluşturur.','Use when you need direct conductor events or advanced status.','Doğrudan conductor event’leri veya ileri durum gerekiyorsa kullan.'],
 ['HasConductor()','Checks whether an active conductor already exists.','Aktif conductor zaten var mı kontrol eder.','Use before optional debug UI.','Opsiyonel debug UI öncesi kullan.'],
 ['StartMusic(float fadeDuration = -1)','Starts the current/auto/default state.','Mevcut/auto/varsayılan state’i başlatır.','-1 inherits startFadeDuration.','-1 startFadeDuration miras alır.'],
 ['StartMusic(string stateName, int startTrackIndex = -1, float fadeDuration = -1)','Starts a named state and optional track.','İsimli state’i ve opsiyonel track’i başlatır.','Null/empty state falls back through current, autoStartState, then first profile state.','Null/boş state mevcut, autoStartState, sonra ilk profile state sırasıyla düşer.'],
 ['StartMusic(string stateName, int startTrackIndex, int startSectionIndex, float fadeDuration = -1)','Starts a named state, track and section.','İsimli state, track ve section başlatır.','Use for section-aware cues that should skip or enter a specific phrase.','Belirli cümleye girmesi gereken section-aware cue için kullan.'],
 ['StopMusic(float fadeDuration = -1)','Stops playback with a fade.','Playback’i fade ile durdurur.','-1 inherits stopFadeDuration; 0 stops immediately.','-1 stopFadeDuration miras alır; 0 anında durdurur.'],
 ['SetMusicState / TrySetMusicState','Switches to a state with timing, crossfade, zone and start target options.','Timing, crossfade, bölge ve başlangıç hedefi seçenekleriyle state değiştirir.','Try returns false when the request is invalid or cannot play.','Try, istek geçersizse veya çalınamıyorsa false döndürür.'],
 ['SetMusicStateImmediate / SetMusicStateQuantized','Convenience wrappers for immediate or next-bar state changes.','Anlık veya sonraki-bar state değişimi için kısa yollar.','Both still accept crossfade and start track/section overrides.','İkisi de crossfade ve start track/section override alır.'],
 ['AddLayer / AddLayers','Adds one or more manual layers.','Bir veya daha fazla manuel layer ekler.','Use fade overrides and addMode to decide ownership.','Sahiplik için fade override ve addMode kullan.'],
 ['RemoveLayer / ClearLayers','Removes manual layer ownership.','Manuel layer sahipliğini kaldırır.','Intensity or zones may still keep their own layers active.','Intensity veya bölgeler kendi layer’larını aktif tutabilir.'],
 ['IsLayerActive / GetAvailableLayers / GetActiveLayers / TryGetLayerFadeDurations','Reads layer state and authored fade data.','Layer durumunu ve yazılmış fade verisini okur.','Use for UI and safe tool panels.','UI ve güvenli tool panelleri için kullan.'],
 ['LockCurrentTrack / UnlockCurrentTrack / IsTrackLocked','Controls manual track lock.','Manuel track kilidini kontrol eder.','Zone lock is tracked separately; either one makes the track locked.','Zone lock ayrı izlenir; ikisinden biri track’i kilitli yapar.'],
 ['JumpToTrack(int trackIndex, float crossfadeDuration = -1, bool quantize = true, int startSectionIndex = -1)','Moves inside the current state playlist.','Mevcut state playlist’i içinde hareket eder.','Bool quantize means next bar; jumping to the current track with a section index routes to a section jump.','Bool quantize sonraki bar demektir; mevcut track’e section index ile atlamak section jump’a yönlendirir.'],
 ['JumpToTrack(int trackIndex, float crossfadeDuration, BSTTransitionMode transitionMode, int startSectionIndex = -1)','Moves to another track with full transition-mode timing.','Tam transition-mode zamanlaması ile başka track’e geçer.','OnSectionEnd and OnNextTransitionPoint wait on the current section track before the track handoff.','OnSectionEnd ve OnNextTransitionPoint track handoff öncesi mevcut section track’i bekler.'],
 ['GetCurrentTrackIndex / GetCurrentTrackName / GetCurrentStateTrackNames','Reads current-state track info.','Mevcut state track bilgisini okur.','Use to build runtime track pickers.','Runtime track seçicileri yapmak için kullan.'],
 ['GetCurrentStateTrackSectionNames / GetCurrentStateTrackEntrySectionIndex','Reads section names and entry section for a track.','Bir track’in section adlarını ve entry section’ını okur.','Useful for panel start-section controls.','Panel start-section kontrolleri için kullanışlı.'],
 ['PushStateRequest / TryPushStateRequest / RemoveStateRequest / ClearStateRequests / GetActiveStateRequests','Priority request arbitration.','Öncelikli request önceliklendirmesi.','Requests do not carry crossfade overrides; they carry id, state, priority, zone force and quantize.','Request’ler crossfade override taşımaz; id, state, priority, zone force ve quantize taşır.'],
 ['JumpToSection / JumpToSectionByName','Moves within section-based tracks.','Section tabanlı track’ler içinde hareket eder.','Quantized jumps wait for valid exits; current-section requests do not restart the phrase.','Quantize jump geçerli çıkışı bekler; mevcut section isteği cümleyi restart etmez.'],
 ['GetCurrentSectionNames / GetCurrentSectionInfo / GetCurrentSectionIndex / GetCurrentSectionBar / GetCurrentSectionName / GetSectionLoopCount','Reads section runtime state.','Section runtime durumunu okur.','Use section-local bar for valid exit authoring checks.','Valid exit authoring kontrolü için section-local bar kullan.'],
 ['HasPendingSectionTransition / GetPendingSectionIndex / IsSectionSystemActive','Reads section-system status.','Section sistemi durumunu okur.','Pending section is only queued section jump state.','Pending section sadece kuyruktaki section jump durumudur.'],
 ['SetCustomFlag / GetCustomFlag / ClearCustomFlags','Sets boolean flags for branch conditions.','Branch koşulları için boolean flag ayarlar.','Keep flag names stable like API constants.','Flag isimlerini API sabiti gibi sabit tut.'],
 ['SetIntensity(float intensity, bool quantize = true, bool smooth = false, float smoothSpeed = 0, BSTSmoothEasing easingType = EaseInOut, float layerFadeOverride = -1)','Sets 0-1 intensity.','0-1 intensity ayarlar.','Smooth moves the numeric value; layerFadeOverride controls the audible layer-volume fade separately.','Smooth sayısal değeri hareket ettirir; layerFadeOverride duyulan layer-volume fade’ini ayrı kontrol eder.'],
 ['GetIntensity / GetBpm / GetCurrentBar / GetCurrentBeat / IsPlaying','Timing and status getters.','Zamanlama ve durum getter’ları.','Safe before playback; see fallback values.','Playback öncesi güvenli; fallback değerlerine bak.'],
 ['PlayStinger(AudioClip clip, bool quantize = true, float fadeIn = -1) / PlayStinger(string cueName)','Plays direct or profile stingers.','Doğrudan veya profil stinger’ı çalar.','-1 fadeIn inherits defaultStingerFadeIn.','-1 fadeIn defaultStingerFadeIn miras alır.'],
 ['StartDucking / StopDucking / SetDuckLayers / GetDuckLayers / SetDuckStingers / GetDuckStingers','Controls dialogue/key-audio ducking.','Diyalog/önemli ses ducking’ini kontrol eder.','-1 fadeTime inherits ducking fade defaults; duckStingers decides whether one-shots dip too.','-1 fadeTime ducking fade varsayılanlarını miras alır; duckStingers tek seferlik vurguların da kısılıp kısılmayacağını belirler.']
];

const DOCS = {
home:{
en:`
<p class="lead">Welcome. This is the full manual for BeatSyncToolkit. Use the left sidebar like a book: every system has its own page that teaches the idea, the editor setup, the code, and real examples.</p>
<p>If you have never built adaptive music before, do not worry. You will start with one music file and one component, hear it play, and only then add layers, sections and zones. Each page is written to be read top to bottom.</p>
<h3>Pick where to start</h3>
${cards([
 ['New to all of this','Read <b>Quick Start</b>, then <b>Music Profiles</b>. Build one state with one full-mix loop, assign it to a Conductor, and press Play. Add more once that loop is stable.','Önce <b>Hızlı Başlangıç</b>, sonra <b>Müzik Profilleri</b>. Tek state ve tek full-mix loop kur, Conductora ata, Playe bas. Bu loop stabil olunca devam et.'],
 ['Designer / no code','Use <b>Music Profiles</b>, <b>Music Zones</b> and the <b>Control Panel</b> to build and test reactive music entirely in the editor.','<b>Müzik Profilleri</b>, <b>Müzik Bölgeleri</b> ve <b>Kontrol Paneli</b> ile tepkili müziği tamamen editörde kur ve test et.'],
 ['Programmer','Drive everything from one static class. Read <b>Gameplay API</b> and <b>Requests</b>. You send musical intent; the profile decides how it sounds.','Her şeyi tek statik sınıftan sür. <b>Oyun API</b> ve <b>İstekler</b>i oku. Sen müzikal niyet gönderirsin; nasıl duyulacağına profil karar verir.']
], 'en')}
${call('note','How every page is organised','Each system page follows the same order: what it is and how it works, how to set it up in the editor, how to drive it from code, a real game example, common mistakes, and a full settings reference. Nothing is hidden behind tabs - just scroll.')}
`,
tr:`
<p class="lead">Hoş geldin. Burası BeatSyncToolkit'in tam kullanım kılavuzu. Sol menüyü bir kitap gibi kullan: her sistemin kendi sayfası var ve fikri, editör kurulumunu, kodu ve gerçek örnekleri anlatır.</p>
<p>Daha önce hiç adaptif müzik kurmadıysan endişelenme. Tek bir müzik dosyası ve tek bir bileşenle başlayacaksın, çaldığını duyacaksın ve ancak ondan sonra katman, section ve bölge ekleyeceksin. Her sayfa yukarıdan aşağı okunacak şekilde yazıldı.</p>
<h3>Nereden başlamalı</h3>
${cards([
 ['Bunlara yeniysen','Önce <b>Hızlı Başlangıç</b>, sonra <b>Müzik Profilleri</b>. Tek state ve tek full-mix loop kur, Conductora ata, Playe bas. Loop stabil olunca devam et.','Önce <b>Hızlı Başlangıç</b>, sonra <b>Müzik Profilleri</b>. Tek state ve tek full-mix loop kur, Conductora ata, Playe bas. Loop stabil olunca devam et.'],
 ['Tasarımcı / kodsuz','<b>Müzik Profilleri</b>, <b>Müzik Bölgeleri</b> ve <b>Kontrol Paneli</b> ile tepkili müziği tamamen editörde kur ve test et.','<b>Müzik Profilleri</b>, <b>Müzik Bölgeleri</b> ve <b>Kontrol Paneli</b> ile tepkili müziği tamamen editörde kur ve test et.'],
 ['Programcı','Her şeyi tek statik sınıftan sür. <b>Oyun API</b> ve <b>İstekler</b>i oku. Sen müzikal niyet gönderirsin; nasıl duyulacağına profil karar verir.','Her şeyi tek statik sınıftan sür. <b>Oyun API</b> ve <b>İstekler</b>i oku. Sen müzikal niyet gönderirsin; nasıl duyulacağına profil karar verir.']
], 'tr')}
${call('note','Her sayfa nasıl düzenlendi','Her sistem sayfası aynı sırayı izler: nedir ve nasıl çalışır, editörde nasıl kurulur, koddan nasıl sürülür, gerçek bir oyun örneği, sık hatalar ve tam ayar referansı. Hiçbir şey sekme arkasında gizli değil - sadece kaydır.')}
`},

'before-you-start':{
en:`<p class="lead">Five minutes of mental model now will save you hours later. BeatSyncToolkit is built around one simple picture, and everything else is a detail of that picture.</p>
<h3>The mental model</h3>
<p>Think of a small orchestra. The <b>Conductor</b> is the performer that actually plays sound. The <b>Music Profile</b> is the written score it reads: which moods exist, which songs belong to each mood, which stems and sections each song has. Your <b>game</b> never touches audio directly - it just calls out named intentions ("we are in combat now", "danger is rising") and the Conductor performs them at a musically correct moment.</p>
<p>That separation is the whole point. Designers write the score in the profile; programmers send intent through the <code>BST</code> API; the toolkit handles bars, beats, fades, scheduling and sample-accurate stems so the music never sounds like it jumped.</p>
<h3>What your project needs</h3>
${tbl(['Requirement','Why it matters'],[
 ['Unity 2022.3 LTS or newer','The supported baseline. Newer LTS versions also work.'],
 ['One active AudioListener','BeatSyncToolkit schedules clips, but Unity still needs a listener (usually on your camera) to output sound.'],
 ['Exactly one active Conductor','Two Conductors are two orchestras playing over each other. Keep one in the scene that owns music.'],
 ['Tempo-stable, loop-friendly audio','Each track has a fixed BPM and loops cleanly at its bar boundary so transitions stay seamless.']
])}
<h3>Names are a contract</h3>
<p>State, layer, section and stinger names are plain, <b>case-sensitive</b> strings shared between the profile and your code. <code>"Combat"</code> is not <code>"combat"</code>. A typo does not throw an error - it simply does nothing, which is the most common "why is my music silent" cause. The cleanest habit is to keep names in one constants file.</p>
${code(`using Nonfigure.BeatSyncToolkit;

public static class MusicNames
{
    public const string Explore = "Explore";
    public const string Combat  = "Combat";
    public const string Boss    = "Boss";

    public const string Drums   = "Drums";
    public const string Victory = "Victory";
}

// later: BST.SetMusicState(MusicNames.Combat);`)}
<h3>Tempo decides everything</h3>
<p>Bars and beats are derived from each track's <b>BPM</b> and <b>beats per bar</b>. Get them right and quantized changes land exactly on the beat; get them wrong and even perfect code will sound early or late. If you do not know a track's tempo, find it with a free online BPM detector, read it from the file name, or ask whoever made the music. 120 BPM and 4/4 are common examples, not defaults.</p>
${call('warn','Most common beginner trap','Silent music is almost always one of three things: no profile assigned to the Conductor, a mistyped state name, or no active AudioListener. Turn on the Conductor <code>debugLog</code> and it will tell you which one.')}
<h3>Settings reference</h3>
${settingRows([
 ['One Conductor','Keep one active BSTConductor in the music-owning scene.','Müzikten sorumlu sahnede tek aktif BSTConductor bırak.','Two conductors are two orchestras playing over each other.','İki conductor, üst üste çalan iki orkestra gibidir.'],
 ['AudioListener','Unity still needs one active AudioListener.','Unitynin hâlâ bir aktif AudioListenera ihtiyacı var.','BST schedules clips; Unity outputs them.','BST klipleri schedule eder; Unity onları duyurur.'],
 ['Music Profile','Create a BSTMusicProfile for your project music.','Proje müziğin için BSTMusicProfile oluştur.','The profile is the score book the Conductor reads.','Profil, Conductorın okuduğu partisyon defteridir.'],
 ['Exact names','State/layer/section/stinger names are case-sensitive strings.','State/layer/section/stinger isimleri büyük-küçük harfe duyarlı stringlerdir.','Treat names as a code-facing contract.','İsimleri kodla yapılan sözleşme gibi düşün.'],
 ['BPM and beats per bar','Timing comes from BPM and beats per bar.','Zamanlama BPM ve beats per bardan gelir.','Wrong tempo makes transitions land in the wrong musical place.','Yanlış tempo geçişleri yanlış müzikal noktaya düşürür.']
], 'en')}`,
tr:`<p class="lead">Şimdi beş dakika ayıracağın zihinsel model, sonra saatler kazandırır. BeatSyncToolkit tek bir basit resmin etrafında kuruludur; gerisi hep o resmin detayıdır.</p>
<h3>Zihinsel model</h3>
<p>Küçük bir orkestra düşün. <b>Conductor</b>, sesi gerçekten çalan icracıdır. <b>Müzik Profili</b>, onun okuduğu yazılı partisyondur: hangi modlar var, her moda hangi şarkılar ait, her şarkının hangi stem ve sectionları var. <b>Oyunun</b> sese hiç doğrudan dokunmaz - sadece isimli niyetler seslendirir ("artık combattayız", "tehlike artıyor") ve Conductor bunları müzikal olarak doğru anda icra eder.</p>
<p>Bu ayrım işin tüm özüdür. Tasarımcılar skoru profilde yazar; programcılar niyeti <code>BST</code> API ile gönderir; toolkit ölçü, vuruş, fade, scheduling ve örnek-doğru stemleri halleder; böylece müzik asla atlamış gibi duyulmaz.</p>
<h3>Projenin neye ihtiyacı var</h3>
${tbl(['Gereksinim','Neden önemli'],[
 ['Unity 2022.3 LTS veya üzeri','Desteklenen temel sürüm. Daha yeni LTS sürümleri de çalışır.'],
 ['Bir aktif AudioListener','BeatSyncToolkit klipleri schedule eder ama Unitynin sesi vermesi için (genelde kamerada) bir listener gerekir.'],
 ['Tam olarak tek aktif Conductor','İki Conductor, üst üste çalan iki orkestradır. Müziği yöneten sahnede tek tane tut.'],
 ['Tempo-stabil, loop uyumlu ses','Her trackin sabit BPMi olur ve ölçü sınırında temiz loop yapar; böylece geçişler kusursuz kalır.']
])}
<h3>İsimler bir sözleşmedir</h3>
<p>State, layer, section ve stinger isimleri; profil ile kodun paylaştığı, <b>büyük-küçük harfe duyarlı</b> düz stringlerdir. <code>"Combat"</code>, <code>"combat"</code> değildir. Yazım hatası bir hata fırlatmaz - sadece hiçbir şey yapmaz; bu da en sık "müziğim neden sessiz" sebebidir. En temiz alışkanlık, isimleri tek bir sabitler dosyasında tutmaktır.</p>
${code(`using Nonfigure.BeatSyncToolkit;

public static class MusicNames
{
    public const string Explore = "Explore";
    public const string Combat  = "Combat";
    public const string Boss    = "Boss";

    public const string Drums   = "Drums";
    public const string Victory = "Victory";
}

// sonra: BST.SetMusicState(MusicNames.Combat);`)}
<h3>Tempo her şeyi belirler</h3>
<p>Ölçü ve vuruşlar her trackin <b>BPM</b> ve <b>beats per bar</b> değerinden türetilir. Doğru girersen quantize edilen değişiklikler tam vuruşa oturur; yanlış girersen kusursuz kod bile erken ya da geç duyulur. Bir trackin temposunu bilmiyorsan, ücretsiz bir online BPM dedektörü ile bul, dosya adından oku ya da müziği yapan kişiye sor. 120 BPM ve 4/4 yaygın örneklerdir, varsayılan değildir.</p>
${call('warn','En sık başlangıç tuzağı','Sessiz müzik neredeyse her zaman üç şeyden biridir: Conductora profil atanmamış, state adı yanlış yazılmış ya da aktif AudioListener yok. Conductor <code>debugLog</code>’unu aç; hangisi olduğunu sana söyler.')}
<h3>Ayar referansı</h3>
${settingRows([
 ['Tek Conductor','Keep one active BSTConductor in the music-owning scene.','Müzikten sorumlu sahnede tek aktif BSTConductor bırak.','Two conductors are two orchestras playing over each other.','İki conductor, üst üste çalan iki orkestra gibidir.'],
 ['AudioListener','Unity still needs one active AudioListener.','Unitynin hâlâ bir aktif AudioListenera ihtiyacı var.','BST schedules clips; Unity outputs them.','BST klipleri schedule eder; Unity onları duyurur.'],
 ['Music Profile','Create a BSTMusicProfile for your project music.','Proje müziğin için BSTMusicProfile oluştur.','The profile is the score book the Conductor reads.','Profil, Conductorın okuduğu partisyon defteridir.'],
 ['Birebir isimler','State/layer/section/stinger names are case-sensitive strings.','State/layer/section/stinger isimleri büyük-küçük harfe duyarlı stringlerdir.','Treat names as a code-facing contract.','İsimleri kodla yapılan sözleşme gibi düşün.'],
 ['BPM ve beats per bar','Timing comes from BPM and beats per bar.','Zamanlama BPM ve beats per bardan gelir.','Wrong tempo makes transitions land in the wrong musical place.','Yanlış tempo geçişleri yanlış müzikal noktaya düşürür.']
], 'tr')}`},

'what-is-bst':{
en:`<p class="lead">BeatSyncToolkit turns ordinary audio clips into a reactive score. The magic is not just changing the music - it is changing it at a musical time, so every transition still sounds composed.</p>
<h3>The problem it solves</h3>
<p>Most game music is either a single loop that ignores what is happening, or a hard cut between songs that feels jarring the moment combat starts. Adaptive music fixes both, but writing the timing, fading and stem scheduling by hand is a lot of fragile audio code. BeatSyncToolkit is that engine, already built, exposed through one friendly API and a set of inspectors.</p>
<h3>Three ways music can react</h3>
${cards([
 ['Horizontal form','Move between states, tracks and sections over time: Explore to Combat, Intro to Loop, Loop to Outro. The song travels.','Zaman içinde state, track ve sectionlar arası geçiş: Exploredan Combata, Introdan Loopa, Loopdan Outroya. Şarkı yol alır.'],
 ['Vertical arrangement','Add or remove stems while the song keeps playing: drums, bass, pulse, brass, pads. The song thickens or thins without changing.','Şarkı çalmaya devam ederken stem ekle/çıkar: davul, bas, pulse, brass, pad. Şarkı değişmeden kalınlaşır/incelir.'],
 ['Moment accents','Drop one-shot stingers on top, and duck the music for dialogue. The score reacts to single events.','Üstüne tek seferlik stinger bırak ve diyalog için müziği kıs. Skor tekil olaylara tepki verir.']
], 'en')}
<h3>Why "at a musical time" matters</h3>
<p>Imagine combat starting mid-bar. If the music switched instantly it would clip an unfinished beat and feel cheap. BeatSyncToolkit can wait a fraction of a second for the next bar, swap the mood, fade drums in on top, and fire a short alert stinger - all aligned to the grid. The player feels an instant response; the music still feels written by a composer.</p>
${call('tip','One real example','A combat trigger can: switch to the Combat state on the next bar, immediately add a Drums layer, and play a short "Alert" stinger over the top. Three lines of code, and it lands in time every time.')}
<h3>Who it is for</h3>
<p>Designers can author an entire reactive score in the inspector and test it live with the Control Panel, no code at all. Programmers connect gameplay events to music with a few one-line calls and never manage an <code>AudioSource</code> by hand. Most teams use both sides together.</p>`,
tr:`<p class="lead">BeatSyncToolkit, sıradan audio klipleri tepkili bir skora çevirir. Sihir sadece müziği değiştirmek değil; onu doğru müzikal anda değiştirmektir; böylece her geçiş yine bestelenmiş gibi duyulur.</p>
<h3>Çözdüğü sorun</h3>
<p>Çoğu oyun müziği ya ne olduğunu umursamayan tek bir loop, ya da combat başlar başlamaz rahatsız eden sert bir şarkı kesmesidir. Adaptif müzik ikisini de çözer ama zamanlamayı, fadeyi ve stem schedulingi elle yazmak çok kırılgan ses kodudur. BeatSyncToolkit, hazır kurulmuş o motordur; tek bir dost API ve bir dizi inspector ile sunulur.</p>
<h3>Müziğin tepki verebileceği üç yol</h3>
${cards([
 ['Yatay form','Zaman içinde state, track ve sectionlar arası geçiş: Exploredan Combata, Introdan Loopa, Loopdan Outroya. Şarkı yol alır.','Zaman içinde state, track ve sectionlar arası geçiş: Exploredan Combata, Introdan Loopa, Loopdan Outroya. Şarkı yol alır.'],
 ['Dikey aranjman','Şarkı çalmaya devam ederken stem ekle/çıkar: davul, bas, pulse, brass, pad. Şarkı değişmeden kalınlaşır/incelir.','Şarkı çalmaya devam ederken stem ekle/çıkar: davul, bas, pulse, brass, pad. Şarkı değişmeden kalınlaşır/incelir.'],
 ['Anlık vurgular','Üstüne tek seferlik stinger bırak ve diyalog için müziği kıs. Skor tekil olaylara tepki verir.','Üstüne tek seferlik stinger bırak ve diyalog için müziği kıs. Skor tekil olaylara tepki verir.']
], 'tr')}
<h3>"Doğru müzikal anda" neden önemli</h3>
<p>Combatın ölçü ortasında başladığını düşün. Müzik anında değişseydi yarım kalmış bir vuruşu keser ve ucuz hissettirirdi. BeatSyncToolkit, bir sonraki ölçü için saniyenin bir bölümü kadar bekleyebilir, modu değiştirir, üstüne davul fade eder ve kısa bir alarm stingerı çalar - hepsi gride hizalı. Oyuncu anlık tepkiyi hisseder; müzik yine bir besteci yazmış gibi durur.</p>
${call('tip','Gerçek bir örnek','Bir combat tetiği şunu yapabilir: sonraki ölçüde Combat stateine geç, hemen bir Drums katmanı ekle ve üstüne kısa bir "Alert" stingerı çal. Üç satır kod ve her seferinde tam zamanında oturur.')}
<h3>Kimler için</h3>
<p>Tasarımcılar tüm tepkili skoru inspectorda kurabilir ve Kontrol Paneli ile canlı test edebilir, hiç kod yok. Programcılar oyun olaylarını birkaç tek satırlık çağrıyla müziğe bağlar ve hiçbir <code>AudioSource</code>'u elle yönetmez. Çoğu ekip iki tarafı birlikte kullanır.</p>`},

'quick-start':{
en:`<p class="lead">This page has one goal: hear your first adaptive loop. One state, one full-mix track with the correct BPM, one Conductor. Nothing else. Once it plays, the other pages add layers, sections and zones on top.</p>
<h3>1. Create the profile (your score)</h3>
<ol class="steps">
<li><b>Create a Music Profile.</b> In the Project window: <code>Create > BeatSync Toolkit > Music Profile</code>. This asset holds all your music data.</li>
<li><b>Add one state.</b> Under <code>stateConfigs</code> add a single entry and name it <code>Explore</code> (or your real first mood). The name is a case-sensitive string you will reuse from code.</li>
<li><b>Add one track.</b> Under that state add one track, drag your loop into <code>baseClip</code>, and set <code>bpm</code> and <code>beatsPerBar</code> to match the file exactly.</li>
</ol>
${call('warn','Tempo is not optional','Every musical feature is derived from <code>bpm</code> and <code>beatsPerBar</code>. If you do not know the track tempo, find it before continuing - a wrong value makes every later transition feel early or late.')}
<h3>2. Add the Conductor (the performer)</h3>
<ol class="steps">
<li><b>Create it.</b> <code>GameObject > BeatSync Toolkit > BST Conductor</code>.</li>
<li><b>Assign the profile.</b> Drag your Music Profile into the conductor's <code>activeProfile</code> field.</li>
<li><b>Confirm an AudioListener exists</b> in the scene (usually on the Main Camera). Unity needs one to output any sound.</li>
</ol>
<h3>3. Make it start, then press Play</h3>
<p>Pick one of two ways to begin playback.</p>
${tbl(['Way to start','How','When to use'],[
 ['Automatic','Set <code>autoStartState</code> to <code>Explore</code> and leave <code>startOnBeginPlay</code> on.','Simplest. The music begins as soon as the scene plays.'],
 ['From code','Turn <code>startOnBeginPlay</code> off and call <code>BST.StartMusic</code> yourself.','When a loading screen or game manager decides the moment.']
])}
${code(`using Nonfigure.BeatSyncToolkit;

public class MusicBootstrap : MonoBehaviour
{
    void Start()
    {
        // The first BST call also creates the hidden manager - no extra setup.
        BST.StartMusic("Explore", fadeDuration: 0.5f);
    }
}`)}
<p>Press <b>Play</b>. You should hear your loop. That is a complete, working adaptive music setup.</p>
${call('warn','If you hear nothing','Check, in order: the profile is assigned to the Conductor, the state name matches exactly, the clip is assigned, and there is exactly one active AudioListener. Turn on the Conductor <code>debugLog</code> and it will name the cause.')}
<h3>4. Test it with no code</h3>
${call('tip','Runtime Control Panel','Add a panel with <code>Add Component > BeatSync Toolkit > Runtime Control Panel</code> and press Play. You can switch states, add layers, jump sections, change intensity and fire stingers by hand - before writing any gameplay. This is the fastest way to audition a profile.')}
<h3>Where to go next</h3>
<p>Your one loop is the foundation. Grow it without rebuilding the scene:</p>
${cards([
 ['Add stem layers','Open <b>Layers &amp; Stems</b>. Fade instruments in and out while the song keeps playing.','<b>Katmanlar &amp; Stem\'ler</b>i aç. Şarkı çalmaya devam ederken enstrümanları fade ile aç/kapat.'],
 ['Add musical form','Open <b>Sections &amp; Branching</b>. Turn the track into intro-loop-bridge-outro that can branch.','<b>Section\'lar &amp; Dallanma</b>yı aç. Tracki dallanabilen intro-loop-bridge-outro yap.'],
 ['React to the world','Open <b>Music Zones</b>. A place in the scene chooses the music with no gameplay code.','<b>Müzik Bölgeleri</b>ni aç. Sahnedeki bir yer müziği kodsuz seçer.'],
 ['Drive it from gameplay','Open <b>Project Integration</b>. Connect real game events to the music cleanly.','<b>Projeye Entegrasyon</b>u aç. Gerçek oyun olaylarını müziğe temizce bağla.']
], 'en')}
${call('note','Useful creation paths','All helpers live on the real Unity menus: <code>GameObject > BeatSync Toolkit > BST Conductor / BST Music Zone</code>, and <code>Assets > Create > BeatSync Toolkit > Music Profile / Intensity Profile</code>.')}`,
tr:`<p class="lead">Bu sayfanın tek amacı var: ilk adaptif loop'unu duymak. Tek state, doğru BPM'li tek full-mix track, tek Conductor. Başka hiçbir şey yok. Çaldıktan sonra diğer sayfalar üstüne katman, section ve bölge ekler.</p>
<h3>1. Profili oluştur (senin skorun)</h3>
<ol class="steps">
<li><b>Music Profile oluştur.</b> Project penceresinde: <code>Create > BeatSync Toolkit > Music Profile</code>. Bu asset tüm müzik verini tutar.</li>
<li><b>Tek state ekle.</b> <code>stateConfigs</code> altına tek bir giriş ekle ve adını <code>Explore</code> yap (veya gerçek ilk modun). Bu ad, koddan tekrar kullanacağın büyük-küçük harfe duyarlı bir stringtir.</li>
<li><b>Tek track ekle.</b> O state altına bir track ekle, loop'unu <code>baseClip</code>'e sürükle ve <code>bpm</code> ile <code>beatsPerBar</code>'ı dosyayla birebir gir.</li>
</ol>
${call('warn','Tempo opsiyonel değil','Her müzikal özellik <code>bpm</code> ve <code>beatsPerBar</code> değerinden türetilir. Track temposunu bilmiyorsan devam etmeden önce bul - yanlış değer sonraki tüm geçişleri erken ya da geç hissettirir.')}
<h3>2. Conductor'ı ekle (icracı)</h3>
<ol class="steps">
<li><b>Oluştur.</b> <code>GameObject > BeatSync Toolkit > BST Conductor</code>.</li>
<li><b>Profili ata.</b> Music Profile'ını conductor'ın <code>activeProfile</code> alanına sürükle.</li>
<li><b>Sahnede bir AudioListener olduğunu doğrula</b> (genelde Main Camera'da). Unity'nin ses verebilmesi için gerekir.</li>
</ol>
<h3>3. Başlat ve Play'e bas</h3>
<p>Playback'i başlatmanın iki yolundan birini seç.</p>
${tbl(['Başlatma yolu','Nasıl','Ne zaman'],[
 ['Otomatik','<code>autoStartState</code>\'i <code>Explore</code> yap ve <code>startOnBeginPlay</code> açık kalsın.','En basiti. Müzik sahne oynar oynamaz başlar.'],
 ['Koddan','<code>startOnBeginPlay</code>\'i kapat ve <code>BST.StartMusic</code>\'i kendin çağır.','Anı bir yükleme ekranı veya game manager belirleyecekse.']
])}
${code(`using Nonfigure.BeatSyncToolkit;

public class MusicBootstrap : MonoBehaviour
{
    void Start()
    {
        // İlk BST çağrısı gizli manager'ı da oluşturur - ekstra kurulum yok.
        BST.StartMusic("Explore", fadeDuration: 0.5f);
    }
}`)}
<p><b>Play</b>'e bas. Loop'unu duymalısın. Bu, tam ve çalışan bir adaptif müzik kurulumudur.</p>
${call('warn','Hiçbir şey duymuyorsan','Sırayla kontrol et: profil Conductor\'a atandı mı, state adı birebir eşleşiyor mu, clip atandı mı ve tam olarak bir aktif AudioListener var mı. Conductor <code>debugLog</code>\'unu aç; sebebi söyler.')}
<h3>4. Kodsuz test et</h3>
${call('tip','Runtime Control Panel','<code>Add Component > BeatSync Toolkit > Runtime Control Panel</code> ile panel ekle ve Play\'e bas. Hiç gameplay yazmadan state değiştirip layer ekleyebilir, section atlayıp intensity değiştirebilir ve stinger çalabilirsin. Bir profili denemenin en hızlı yolu budur.')}
<h3>Sırada ne var</h3>
<p>Tek loop'un temeldir. Sahneyi yeniden kurmadan büyüt:</p>
${cards([
 ['Stem katman ekle','<b>Layers &amp; Stems</b>i aç. Şarkı çalmaya devam ederken enstrümanları fade ile aç/kapat.','<b>Katmanlar &amp; Stem\'ler</b>i aç. Şarkı çalmaya devam ederken enstrümanları fade ile aç/kapat.'],
 ['Müzikal form ekle','<b>Sections &amp; Branching</b>i aç. Tracki dallanabilen intro-loop-bridge-outro yap.','<b>Section\'lar &amp; Dallanma</b>yı aç. Tracki dallanabilen intro-loop-bridge-outro yap.'],
 ['Dünyaya tepki ver','<b>Music Zones</b>i aç. Sahnedeki bir yer müziği kodsuz seçer.','<b>Müzik Bölgeleri</b>ni aç. Sahnedeki bir yer müziği kodsuz seçer.'],
 ['Gameplay\'den sür','<b>Project Integration</b>ı aç. Gerçek oyun olaylarını müziğe temizce bağla.','<b>Projeye Entegrasyon</b>u aç. Gerçek oyun olaylarını müziğe temizce bağla.']
], 'tr')}
${call('note','Kullanışlı oluşturma yolları','Tüm helperlar gerçek Unity menülerinde: <code>GameObject > BeatSync Toolkit > BST Conductor / BST Music Zone</code> ve <code>Assets > Create > BeatSync Toolkit > Music Profile / Intensity Profile</code>.')}`},

'project-integration':{
en:`<p class="lead">Quick Start proved the music plays. Integration is about wiring it into a real game cleanly, so audio and gameplay stay loosely coupled. The rule is simple: gameplay says <i>what is happening</i>; the profile decides <i>what it sounds like</i>.</p>
<h3>The one pattern that matters: a music bridge</h3>
<p>Do not scatter <code>BST</code> calls across your combat, stealth and UI scripts. Put them in one small component - a "music bridge" - that listens to gameplay events and translates them into musical intent. Your gameplay systems then never reference audio at all, and every music decision lives in one readable place.</p>
${code(`using Nonfigure.BeatSyncToolkit;

public class MusicBridge : MonoBehaviour
{
    // Combat and low-health can overlap, so they are requests, not raw state sets.
    public void OnCombatStarted()
    {
        BST.PushStateRequest("combat", "Combat", priority: 20, quantize: true);
        BST.SetIntensity(0.75f, quantize: true, smooth: true, smoothSpeed: 3f);
    }

    public void OnCombatEnded()
    {
        BST.RemoveStateRequest("combat");
        BST.SetIntensity(0.15f, quantize: true, smooth: true, smoothSpeed: 2f);
    }

    // A cutscene must own the score, so it forces past zones and ducks dialogue.
    public void OnCutsceneStart()
    {
        BST.PushStateRequest("cutscene", "Story", priority: 100, forceWhileInZone: true);
        BST.StartDucking(targetVolume: 0.3f, fadeTime: 0.4f);
    }

    public void OnCutsceneEnd()
    {
        BST.RemoveStateRequest("cutscene");
        BST.StopDucking(fadeTime: 0.8f);
    }
}`)}
<h3>Call from events, not from Update</h3>
<p>Send intent at the moment something changes - combat starts, a room is entered, a boss reaches phase two, dialogue begins. Calling <code>SetMusicState</code> every frame is wasteful and fights the musical timing. The one natural exception is <b>intensity</b>: it is a continuous 0-1 value, so setting it every frame is fine - it is quantized internally.</p>
${code(`// Fine every frame: a continuous value.
void Update()
{
    float pressure = Mathf.Clamp01(threat / maxThreat);
    BST.SetIntensity(pressure, quantize: true, smooth: true);
}

// Not every frame: discrete moments only.
void OnEnterBossRoom() => BST.PushStateRequest("boss", "Boss", priority: 60);`)}
<h3>Pick the right tool for each gameplay need</h3>
<p>The most common integration mistake is forcing everything through <code>SetMusicState</code>. Match the mechanism to the situation instead:</p>
${tbl(['Gameplay situation','Use','Why'],[
 ['One clear global mood change (menu to game)','<code>SetMusicState</code>','Simple, last-caller-wins is acceptable here.'],
 ['Systems that overlap (combat, low health, cutscene)','<code>PushStateRequest</code>','Priority + id resolves who wins automatically; nothing gets stuck.'],
 ['A place in the world owns the music (town, cave)','<b>Music Zone</b>','No gameplay code; entering/leaving restores the previous music.'],
 ['Same mood, more or less energy','<code>SetIntensity</code>','Drives stem layers up and down without changing the song.'],
 ['A single discrete accent (victory, alert)','<code>PlayStinger</code>','One-shot over the score; never mutates state.'],
 ['Clear space for dialogue','<code>StartDucking</code> / <code>StopDucking</code>','Lowers the music bed temporarily, then restores it.']
])}
${call('tip','Why requests beat raw state sets','When combat, low health and a cutscene all want music at once, plain <code>SetMusicState</code> becomes "whoever called last wins". Requests carry a priority and a stable id, so the right one is chosen automatically and removed cleanly when its moment ends. See <b>Requests &amp; Arbitration</b>.')}
<h3>Names are a shared contract</h3>
<p>Every state, layer, section and stinger name is a case-sensitive string shared between the profile and your code. Keep them in one constants file so a rename never silently breaks the music (a mistyped name does nothing - no error).</p>
${code(`public static class Music
{
    public const string Explore = "Explore";
    public const string Combat  = "Combat";
    public const string Boss    = "Boss";
    public const string Drums   = "Drums";
}

// BST.SetMusicState(Music.Combat);`)}
<h3>Scenes and lifetime</h3>
<p>The hidden <b>BSTManager</b> (intensity, custom flags, active zones, the conductor reference) is created on first use and survives scene loads automatically. The <b>BSTConductor</b>, however, is an ordinary scene object. Decide how music should behave across scene changes:</p>
${tbl(['You want','Do this'],[
 ['Music restarts per scene','Put a Conductor in each scene. Simplest for level-based games.'],
 ['Music continues across scene loads','Place the Conductor on a persistent object (call <code>DontDestroyOnLoad</code> on it) and keep only one alive.'],
 ['Different music per area in one scene','Use one Conductor plus Music Zones - no extra conductors.']
])}
${call('warn','Always exactly one active Conductor','Two active Conductors are two orchestras playing over each other. If you make one persistent, make sure new scenes do not also contain their own.')}
<h3>Pre-release integration checklist</h3>
${settingRows([
 ['Own music, not demo','Replace demo profiles/audio with your own.','Demo profil/sesleri kendi içeriğinle değiştir.','Remove the Demo Content folder if you do not want it in the build.','Build\'de istemiyorsan Demo Content klasörünü kaldır.'],
 ['One Conductor + one AudioListener','Verify both, in every shipped scene.','Her yayın sahnesinde ikisini de doğrula.','This is the most common silent-music cause.','En sık sessiz-müzik sebebi budur.'],
 ['Names match','State/layer/section/stinger constants match the profile exactly.','State/layer/section/stinger sabitleri profille birebir eşleşsin.','Use a constants file as the single source of truth.','Tek doğruluk kaynağı olarak sabitler dosyası kullan.'],
 ['Walk every moment','Play through states, layers, sections, zones, stingers, ducking once.','State, layer, section, zone, stinger, ducking\'i bir kez oyna.','The Runtime Control Panel is the fastest way to do this.','Bunun en hızlı yolu Runtime Control Panel\'dir.'],
 ['Turn off debug','Disable conductor <code>debugLog</code> before shipping.','Yayından önce conductor <code>debugLog</code>\'unu kapat.','Keeps the player Console clean.','Oyuncu Console\'unu temiz tutar.']
], 'en')}`,
tr:`<p class="lead">Hızlı Başlangıç müziğin çaldığını kanıtladı. Entegrasyon ise bunu gerçek bir oyuna temiz bir şekilde bağlamaktır; böylece ses ve gameplay gevşek bağlı kalır. Kural basit: gameplay <i>ne olduğunu</i> söyler; profil <i>nasıl duyulacağına</i> karar verir.</p>
<h3>Tek önemli kalıp: bir music bridge</h3>
<p><code>BST</code> çağrılarını combat, stealth ve UI scriptlerine dağıtma. Hepsini tek küçük bir bileşene - bir "music bridge"e - koy; bu bileşen gameplay olaylarını dinleyip müzikal niyete çevirir. Gameplay sistemlerin böylece sese hiç dokunmaz ve her müzik kararı tek, okunur bir yerde yaşar.</p>
${code(`using Nonfigure.BeatSyncToolkit;

public class MusicBridge : MonoBehaviour
{
    // Combat ve düşük-can çakışabilir, bu yüzden ham state değil request kullanılır.
    public void OnCombatStarted()
    {
        BST.PushStateRequest("combat", "Combat", priority: 20, quantize: true);
        BST.SetIntensity(0.75f, quantize: true, smooth: true, smoothSpeed: 3f);
    }

    public void OnCombatEnded()
    {
        BST.RemoveStateRequest("combat");
        BST.SetIntensity(0.15f, quantize: true, smooth: true, smoothSpeed: 2f);
    }

    // Bir cutscene skoru sahiplenmeli; bölgeleri ezer ve diyalog için duck eder.
    public void OnCutsceneStart()
    {
        BST.PushStateRequest("cutscene", "Story", priority: 100, forceWhileInZone: true);
        BST.StartDucking(targetVolume: 0.3f, fadeTime: 0.4f);
    }

    public void OnCutsceneEnd()
    {
        BST.RemoveStateRequest("cutscene");
        BST.StopDucking(fadeTime: 0.8f);
    }
}`)}
<h3>Update'ten değil, olaylardan çağır</h3>
<p>Niyeti bir şey değiştiği anda gönder - combat başlar, bir odaya girilir, boss faz ikiye ulaşır, diyalog başlar. <code>SetMusicState</code>'i her kare çağırmak israftır ve müzikal zamanlamayla çakışır. Tek doğal istisna <b>intensity</b>'dir: sürekli bir 0-1 değeridir, bu yüzden her kare ayarlamak sorun değildir - içeride quantize edilir.</p>
${code(`// Her kare uygun: sürekli bir değer.
void Update()
{
    float pressure = Mathf.Clamp01(threat / maxThreat);
    BST.SetIntensity(pressure, quantize: true, smooth: true);
}

// Her kare değil: sadece ayrık anlar.
void OnEnterBossRoom() => BST.PushStateRequest("boss", "Boss", priority: 60);`)}
<h3>Her gameplay ihtiyacına doğru aracı seç</h3>
<p>En sık entegrasyon hatası her şeyi <code>SetMusicState</code> üzerinden zorlamaktır. Bunun yerine mekanizmayı duruma göre seç:</p>
${tbl(['Gameplay durumu','Kullan','Neden'],[
 ['Tek net global mod değişimi (menüden oyuna)','<code>SetMusicState</code>','Basit; burada son-çağıran-kazanır kabul edilebilir.'],
 ['Çakışan sistemler (combat, düşük can, cutscene)','<code>PushStateRequest</code>','Priority + id kimin kazandığını otomatik çözer; hiçbir şey takılı kalmaz.'],
 ['Dünyadaki bir yer müziği sahiplenir (kasaba, mağara)','<b>Music Zone</b>','Gameplay kodu yok; giriş/çıkış önceki müziği geri yükler.'],
 ['Aynı mod, daha az/çok enerji','<code>SetIntensity</code>','Şarkıyı değiştirmeden stem katmanlarını yükseltip alçaltır.'],
 ['Tek ayrık vurgu (zafer, alarm)','<code>PlayStinger</code>','Skorun üstünde tek seferlik; state\'i asla değiştirmez.'],
 ['Diyaloga yer aç','<code>StartDucking</code> / <code>StopDucking</code>','Müzik yatağını geçici alçaltır, sonra geri yükler.']
])}
${call('tip','Neden request ham state\'ten iyidir','Combat, düşük can ve bir cutscene aynı anda müzik isterse, düz <code>SetMusicState</code> "en son çağıran kazanır"a döner. Requestler bir priority ve sabit id taşır; doğru olan otomatik seçilir ve anı bitince temizce kaldırılır. Bkz. <b>İstekler &amp; Önceliklendirme</b>.')}
<h3>İsimler ortak bir sözleşmedir</h3>
<p>Her state, layer, section ve stinger adı; profil ile kodun paylaştığı büyük-küçük harfe duyarlı bir stringtir. Hepsini tek bir sabitler dosyasında tut; böylece bir yeniden adlandırma müziği sessizce bozmaz (yanlış yazılan ad hiçbir şey yapmaz - hata vermez).</p>
${code(`public static class Music
{
    public const string Explore = "Explore";
    public const string Combat  = "Combat";
    public const string Boss    = "Boss";
    public const string Drums   = "Drums";
}

// BST.SetMusicState(Music.Combat);`)}
<h3>Sahneler ve yaşam süresi</h3>
<p>Gizli <b>BSTManager</b> (intensity, custom flagler, aktif bölgeler, conductor referansı) ilk kullanımda oluşur ve sahne yüklemelerinde otomatik hayatta kalır. Ancak <b>BSTConductor</b> sıradan bir sahne objesidir. Müziğin sahne değişimlerinde nasıl davranacağına karar ver:</p>
${tbl(['İstediğin','Bunu yap'],[
 ['Müzik her sahnede yeniden başlasın','Her sahneye bir Conductor koy. Level tabanlı oyunlar için en basiti.'],
 ['Müzik sahne yüklemelerinde devam etsin','Conductor\'ı kalıcı bir objeye koy (üzerinde <code>DontDestroyOnLoad</code> çağır) ve yalnızca bir tane canlı tut.'],
 ['Tek sahnede alana göre farklı müzik','Tek Conductor + Music Zone kullan - ekstra conductor yok.']
])}
${call('warn','Her zaman tam olarak tek aktif Conductor','İki aktif Conductor, üst üste çalan iki orkestradır. Birini kalıcı yaparsan, yeni sahnelerin kendi conductor\'larını içermediğinden emin ol.')}
<h3>Yayın öncesi entegrasyon kontrol listesi</h3>
${settingRows([
 ['Own music, not demo','Replace demo profiles/audio with your own.','Demo profil/sesleri kendi içeriğinle değiştir.','Remove the Demo Content folder if you do not want it in the build.','Build\'de istemiyorsan Demo Content klasörünü kaldır.'],
 ['One Conductor + one AudioListener','Verify both, in every shipped scene.','Her yayın sahnesinde ikisini de doğrula.','This is the most common silent-music cause.','En sık sessiz-müzik sebebi budur.'],
 ['Names match','State/layer/section/stinger constants match the profile exactly.','State/layer/section/stinger sabitleri profille birebir eşleşsin.','Use a constants file as the single source of truth.','Tek doğruluk kaynağı olarak sabitler dosyası kullan.'],
 ['Walk every moment','Play through states, layers, sections, zones, stingers, ducking once.','State, layer, section, zone, stinger, ducking\'i bir kez oyna.','The Runtime Control Panel is the fastest way to do this.','Bunun en hızlı yolu Runtime Control Panel\'dir.'],
 ['Turn off debug','Disable conductor <code>debugLog</code> before shipping.','Yayından önce conductor <code>debugLog</code>\'unu kapat.','Keeps the player Console clean.','Oyuncu Console\'unu temiz tutar.']
], 'tr')}`},

'included-assets':{
en:`<p class="lead">The package is split by responsibility, so you always know what ships in your game and what stays in the editor.</p>
<h3>How the folders are organised</h3>
<p>The only folder your built game depends on is <b>Runtime</b>. Editor tooling is stripped from builds automatically, and Demo Content is a reference you can delete once you have learned from it.</p>
${tbl(['Folder','What is inside','Ships in build?'],[
 ['Runtime','Core components, music data types, zones, the manager and the static BST API.','Yes - this is the toolkit.'],
 ['Editor','Custom inspectors and the creation menus.','No - editor only.'],
 ['Prefabs','Ready-made Conductor and Music Zone objects for quick, known-good setup.','Only if you use them.'],
 ['Demo Content','A demo scene, demo profiles, demo audio (full mixes, stems, sections, a stinger) and the demo player.','Optional - learning material.']
])}
${call('note','Documentation is online','The full guide lives at <a href="https://nonfigurestudio.github.io/beatsync-toolkit-docs-unity/">nonfigurestudio.github.io/beatsync-toolkit-docs-unity</a> and is kept up to date there, so it is not bundled as files in the package.')}
<h3>What to do with the demo</h3>
<p>Open the demo scene to hear every feature working, then build your real game with your own profile and music. Keep the demo around while you learn; remove it before shipping if you do not want the extra audio in your build.</p>
${call('note','Namespace','Every runtime type lives in <code>Nonfigure.BeatSyncToolkit</code>. Add <code>using Nonfigure.BeatSyncToolkit;</code> at the top of any script that talks to the toolkit.')}
<h3>Reference</h3>
${settingRows([
 ['Runtime','Core components, profiles, zones, manager and public API.','Temel componentler, profiller, zonelar, manager ve public API.','This is what your game uses.','Oyunun kullandığı katman budur.'],
 ['Editor','Inspectors and menu helpers.','Inspector ve menü yardımcıları.','Authoring comfort, not runtime behavior.','Runtime davranış değil, authoring rahatlığıdır.'],
 ['Prefabs','Ready conductor and zone objects.','Hazır conductor ve zone objeleri.','Use when you want a known-good component setup.','Bilinen doğru component kurulumu istiyorsan kullan.'],
 ['Demo Content','Reference scene/audio/profile content.','Referans sahne/ses/profil içeriği.','Use only to compare behavior; build your game with your own profile and music.','Sadece davranış karşılaştırmak için kullan; oyununu kendi profilin ve müziğinle kur.']
], 'en')}`,
tr:`<p class="lead">Paket sorumluluklara göre ayrılmıştır; böylece oyununa ne girdiğini ve editörde ne kaldığını her zaman bilirsin.</p>
<h3>Klasörler nasıl düzenlenmiş</h3>
<p>Build edilmiş oyununun bağlı olduğu tek klasör <b>Runtime</b>'dır. Editor araçları build'lerden otomatik çıkarılır ve Demo Content, öğrendikten sonra silebileceğin bir referanstır.</p>
${tbl(['Klasör','İçinde ne var','Build’e girer mi?'],[
 ['Runtime','Temel bileşenler, müzik veri tipleri, bölgeler, manager ve statik BST API.','Evet - toolkit budur.'],
 ['Editor','Özel inspectorlar ve oluşturma menüleri.','Hayır - sadece editör.'],
 ['Prefabs','Hızlı ve bilinen-doğru kurulum için hazır Conductor ve Müzik Bölgesi objeleri.','Sadece kullanırsan.'],
 ['Demo Content','Bir demo sahnesi, demo profilleri, demo sesler (full mix, stem, section, bir stinger) ve demo oyuncusu.','Opsiyonel - öğrenme materyali.']
])}
${call('note','Dokümantasyon online','Tam kılavuz <a href="https://nonfigurestudio.github.io/beatsync-toolkit-docs-unity/">nonfigurestudio.github.io/beatsync-toolkit-docs-unity</a> adresinde ve orada güncel tutulur; bu yüzden pakete dosya olarak dahil edilmez.')}
<h3>Demo ile ne yapmalı</h3>
<p>Her özelliğin çalıştığını duymak için demo sahnesini aç, sonra gerçek oyununu kendi profilin ve müziğinle kur. Öğrenirken demoyu yanında tut; build'inde ekstra ses istemiyorsan yayından önce kaldır.</p>
${call('note','Namespace','Her runtime tipi <code>Nonfigure.BeatSyncToolkit</code> içindedir. Toolkit ile konuşan her scriptin başına <code>using Nonfigure.BeatSyncToolkit;</code> ekle.')}
<h3>Referans</h3>
${settingRows([
 ['Runtime','Core components, profiles, zones, manager and public API.','Temel componentler, profiller, zonelar, manager ve public API.','This is what your game uses.','Oyunun kullandığı katman budur.'],
 ['Editor','Inspectors and menu helpers.','Inspector ve menü yardımcıları.','Authoring comfort, not runtime behavior.','Runtime davranış değil, authoring rahatlığıdır.'],
 ['Prefabs','Ready conductor and zone objects.','Hazır conductor ve zone objeleri.','Use when you want a known-good component setup.','Bilinen doğru component kurulumu istiyorsan kullan.'],
 ['Demo Content','Reference scene/audio/profile content.','Referans sahne/ses/profil içeriği.','Use only to compare behavior; build your game with your own profile and music.','Sadece davranış karşılaştırmak için kullan; oyununu kendi profilin ve müziğinle kur.']
], 'tr')}`},

'core-concepts':{
en:`<p class="lead">Seven pieces make up the whole toolkit. They all meet at the Conductor: your game sends intent, the profile describes the score, and the manager resolves shared state like zones and intensity.</p>
<h3>How the pieces connect</h3>
<p>Your gameplay code calls the static <b>BST</b> API. Those calls reach the <b>BSTManager</b>, a hidden singleton that holds the active Conductor, the current intensity, custom flags and the stack of active zones. The <b>BSTConductor</b> reads the assigned <b>BSTMusicProfile</b> and actually performs the music - running the beat/bar clock, scheduling clips, fading layers, branching sections, playing stingers and ducking. <b>Music Zones</b> and <b>Intensity Profiles</b> feed extra intent into that same flow.</p>
${cards([
 ['BSTConductor','The performer. Scheduling, transitions, layers, sections, stingers, ducking and the beat/bar clock all live here. One active per scene.','İcracı. Scheduling, geçişler, layer, section, stinger, ducking ve beat/bar saati burada. Sahnede tek aktif.'],
 ['BSTMusicProfile','The score book. A ScriptableObject holding states, tracks, section form, layer definitions and stinger cues.','Partisyon defteri. State, track, section formu, layer tanımları ve stinger cuelarını tutan ScriptableObject.'],
 ['BSTIntensityProfile','Maps one 0-1 intensity value to layer behavior through thresholds or curves.','Tek bir 0-1 intensity değerini eşik veya eğrilerle layer davranışına çevirir.'],
 ['BSTMusicZone','A scene trigger volume that temporarily overrides state, profile, intensity, layers or track lock.','State, profil, intensity, layer veya track locku geçici override eden sahne trigger hacmi.'],
 ['BSTRuntimeControlPanel','An in-game testing surface for every runtime feature. Designers test the score with no code.','Her runtime özelliği için oyun içi test yüzeyi. Tasarımcılar skoru kodsuz test eder.'],
 ['BST','The static gameplay API. Almost everything your code does goes through this one class.','Statik gameplay API. Kodunun yaptığı neredeyse her şey bu tek sınıftan geçer.'],
 ['BSTManager','A singleton context holder for the conductor, zones, custom flags and intensity. Created automatically.','Conductor, zone, custom flag ve intensity için singleton bağlam tutucu. Otomatik oluşur.']
], 'en')}
${call('note','You rarely touch most of these directly','In practice you author a BSTMusicProfile, drop a BSTConductor, and call BST.* from gameplay. The manager and the internals take care of themselves.')}`,
tr:`<p class="lead">Tüm toolkit yedi parçadan oluşur. Hepsi Conductorda buluşur: oyunun niyet gönderir, profil skoru tarif eder, manager zone ve intensity gibi ortak durumu çözer.</p>
<h3>Parçalar nasıl bağlanır</h3>
<p>Gameplay kodun statik <b>BST</b> API'sini çağırır. Bu çağrılar, aktif Conductoru, mevcut intensityyi, custom flagleri ve aktif bölgelerin yığınını tutan gizli singleton <b>BSTManager</b>'a ulaşır. <b>BSTConductor</b>, atanmış <b>BSTMusicProfile</b>'ı okur ve müziği gerçekten icra eder - beat/bar saatini çalıştırır, klipleri schedule eder, layerları fade eder, sectionları dallandırır, stinger çalar ve duck eder. <b>Müzik Bölgeleri</b> ve <b>Intensity Profilleri</b> aynı akışa ekstra niyet besler.</p>
${cards([
 ['BSTConductor','İcracı. Scheduling, geçişler, layer, section, stinger, ducking ve beat/bar saati burada. Sahnede tek aktif.','İcracı. Scheduling, geçişler, layer, section, stinger, ducking ve beat/bar saati burada. Sahnede tek aktif.'],
 ['BSTMusicProfile','Partisyon defteri. State, track, section formu, layer tanımları ve stinger cuelarını tutan ScriptableObject.','Partisyon defteri. State, track, section formu, layer tanımları ve stinger cuelarını tutan ScriptableObject.'],
 ['BSTIntensityProfile','Tek bir 0-1 intensity değerini eşik veya eğrilerle layer davranışına çevirir.','Tek bir 0-1 intensity değerini eşik veya eğrilerle layer davranışına çevirir.'],
 ['BSTMusicZone','State, profil, intensity, layer veya track locku geçici override eden sahne trigger hacmi.','State, profil, intensity, layer veya track locku geçici override eden sahne trigger hacmi.'],
 ['BSTRuntimeControlPanel','Her runtime özelliği için oyun içi test yüzeyi. Tasarımcılar skoru kodsuz test eder.','Her runtime özelliği için oyun içi test yüzeyi. Tasarımcılar skoru kodsuz test eder.'],
 ['BST','Statik gameplay API. Kodunun yaptığı neredeyse her şey bu tek sınıftan geçer.','Statik gameplay API. Kodunun yaptığı neredeyse her şey bu tek sınıftan geçer.'],
 ['BSTManager','Conductor, zone, custom flag ve intensity için singleton bağlam tutucu. Otomatik oluşur.','Conductor, zone, custom flag ve intensity için singleton bağlam tutucu. Otomatik oluşur.']
], 'tr')}
${call('note','Çoğuna doğrudan nadiren dokunursun','Pratikte bir BSTMusicProfile yazar, bir BSTConductor koyar ve gameplayden BST.* çağırırsın. Manager ve iç yapı kendi işini halleder.')}`},
'music-profiles':{
en:`<p class="lead">The Music Profile is your score book. If the Conductor is the performer, the profile is the written arrangement it reads - and it is where most of your work happens.</p>
<h3>How a profile is structured</h3>
<p>A profile holds two lists. <code>stingerCues</code> are named one-shot accents you fire by name from anywhere. <code>stateConfigs</code> are your musical moods. Each state has a name (the string your game uses) and a list of <b>tracks</b>. A track is one song or cue; a state with several tracks becomes a playlist.</p>
<p>Each track is shaped one of three ways. The simplest assigns a single full-mix clip to <code>baseClip</code>. A richer track adds stem <code>layers</code> you fade in and out without changing the song. The most flexible enables <code>useSections</code> and plays an ordered list of musical blocks (intro, loop, bridge, outro) that can branch. You can mix layers and sections on the same track.</p>
<h3>Set it up in the editor</h3>
<ol class="steps">
<li><b>Create the asset.</b> <code>Create > BeatSync Toolkit > Music Profile</code>.</li>
<li><b>Add a state</b> under <code>stateConfigs</code> and give it a clear name like <code>Explore</code> or <code>Combat</code>.</li>
<li><b>Add a track</b> under that state. Name it musically, e.g. <code>Combat_A</code>.</li>
<li><b>Give it audio.</b> Either assign <code>baseClip</code>, or enable <code>useSections</code> and fill the <code>sections</code> list.</li>
<li><b>Set the tempo.</b> Enter the real <code>bpm</code> and <code>beatsPerBar</code>. Everything musical depends on this.</li>
<li><b>Optional: add layers.</b> In the track <code>layers</code> list, define stems your game can add and remove.</li>
</ol>
<h3>Starting layers and intensity per track</h3>
<p>Two track fields decide how it begins. <code>defaultLayerMode</code> chooses the opening arrangement: <code>MutedOnly</code> starts lean (stems prepared but silent), <code>AllAvailable</code> starts full, and <code>CustomList</code> starts with exactly the layers you list in <code>trackDefaultLayers</code>. <code>intensityOverrideMode</code> decides whether this track follows the conductor intensity rules, a profile override, or its own custom rules.</p>
${ex('A state named <b>Combat</b> is a folder. Inside it, <b>Combat_A</b> is one track. Its layers are <b>Drums</b>, <b>Bass</b> and <b>Brass</b>. If you instead enable sections, the same track becomes <b>Intro -> Loop -> Outro</b> blocks.')}
${call('warn','Stingers are not sections','One-shot accents belong in the profile <code>stingerCues</code> list, never in a track section list. A stinger placed as a section will be treated as a looping musical block.')}
<h3>Profile authoring checklist</h3>
${settingRows([
 ['State name','Keep gameplay-facing names exact.','Gameplay tarafının gördüğü isimleri birebir tut.','Use constants in code and copy the same spelling into the profile.','Kodda constant kullan ve aynı yazımı profile kopyala.'],
 ['Track form','Choose baseClip, layers, sections, or a combination.','baseClip, layer, section veya kombinasyon seç.','Start with the simplest form that proves the cue works.','Cue çalışıyor mu önce en basit formla kanıtla.'],
 ['Tempo data','Set bpm and beatsPerBar before testing transitions.','Geçişleri test etmeden önce bpm ve beatsPerBar gir.','Wrong tempo makes every quantized feature feel wrong.','Yanlış tempo her quantized özelliği yanlış hissettirir.'],
 ['Entry targets','Use defaultStartTrackIndex and entrySectionIndex intentionally.','defaultStartTrackIndex ve entrySectionIndex değerlerini bilinçli kullan.','-1 API overrides fall back to these authored defaults.','API override -1 ise bu yazılmış varsayılanlara düşer.'],
 ['Layer defaults','Pick defaultLayerMode and trackDefaultLayers per track.','defaultLayerMode ve trackDefaultLayers değerlerini track başına seç.','This decides whether a cue starts lean, full, or curated.','Cue sade mi, dolu mu, seçilmiş mi başlar bunu belirler.'],
 ['Validation pass','Use the Runtime Control Panel before gameplay code.','Gameplay kodundan önce Runtime Control Panel kullan.','Test state, track, section and layer names from the buyer-facing UI.','State, track, section ve layer isimlerini alıcının gördüğü UI ile test et.']
], 'en')}
<h3>Settings reference - tracks</h3>
${settingRows(trackSettings, 'en')}`,
tr:`<p class="lead">Müzik Profili senin partisyon defterindir. Conductor icracıysa, profil onun okuduğu yazılı aranjmandır - ve işinin çoğu burada olur.</p>
<h3>Bir profil nasıl yapılanır</h3>
<p>Profil iki liste tutar. <code>stingerCues</code>, her yerden isimle çaldığın isimli tek seferlik vurgulardır. <code>stateConfigs</code> ise müzikal modlarındır. Her state'in bir adı (oyununun kullandığı string) ve bir <b>track</b> listesi vardır. Bir track bir şarkı ya da cuedur; birden çok trackli bir state playliste dönüşür.</p>
<p>Her track üç biçimden biriyle şekillenir. En basiti tek bir full-mix klibi <code>baseClip</code>'e atar. Daha zengin bir track, şarkıyı değiştirmeden fade ile açıp kapattığın stem <code>layers</code> ekler. En esneği <code>useSections</code>'ı açar ve dallanabilen sıralı müzikal blokları (intro, loop, bridge, outro) çalar. Aynı trackte layer ve section birlikte kullanılabilir.</p>
<h3>Editörde kur</h3>
<ol class="steps">
<li><b>Asseti oluştur.</b> <code>Create > BeatSync Toolkit > Music Profile</code>.</li>
<li><b>State ekle</b> (<code>stateConfigs</code> altına) ve <code>Explore</code> ya da <code>Combat</code> gibi net bir ad ver.</li>
<li><b>Track ekle</b> (o state altına). Müzikal adlandır, örn. <code>Combat_A</code>.</li>
<li><b>Ses ver.</b> Ya <code>baseClip</code> ata ya da <code>useSections</code>'ı açıp <code>sections</code> listesini doldur.</li>
<li><b>Tempoyu gir.</b> Gerçek <code>bpm</code> ve <code>beatsPerBar</code> değerlerini gir. Müzikal olan her şey buna bağlıdır.</li>
<li><b>Opsiyonel: layer ekle.</b> Track <code>layers</code> listesinde oyununun ekleyip çıkarabileceği stemleri tanımla.</li>
</ol>
<h3>Track başına başlangıç layerları ve intensity</h3>
<p>İki track alanı başlangıcı belirler. <code>defaultLayerMode</code> açılış aranjmanını seçer: <code>MutedOnly</code> sade başlar (stemler hazır ama sessiz), <code>AllAvailable</code> dolu başlar, <code>CustomList</code> ise tam olarak <code>trackDefaultLayers</code>'ta listelediğin layerlarla başlar. <code>intensityOverrideMode</code> ise bu trackin conductor intensity kurallarını mı, bir profil override'ını mı, yoksa kendi özel kurallarını mı izleyeceğini belirler.</p>
${ex('<b>Combat</b> adlı bir state bir klasördür. İçinde <b>Combat_A</b> bir tracktir. Layerları <b>Drums</b>, <b>Bass</b> ve <b>Brass</b>tır. Bunun yerine sectionları açarsan aynı track <b>Intro -> Loop -> Outro</b> bloklarına dönüşür.')}
${call('warn','Stingerlar section değildir','Tek seferlik vurgular profil <code>stingerCues</code> listesine aittir, asla bir track section listesine değil. Section olarak konulan bir stinger, loop yapan müzikal blok gibi işlenir.')}
<h3>Profil authoring kontrol listesi</h3>
${settingRows([
 ['State name','Keep gameplay-facing names exact.','Gameplay tarafının gördüğü isimleri birebir tut.','Use constants in code and copy the same spelling into the profile.','Kodda constant kullan ve aynı yazımı profile kopyala.'],
 ['Track form','Choose baseClip, layers, sections, or a combination.','baseClip, layer, section veya kombinasyon seç.','Start with the simplest form that proves the cue works.','Cue çalışıyor mu önce en basit formla kanıtla.'],
 ['Tempo data','Set bpm and beatsPerBar before testing transitions.','Geçişleri test etmeden önce bpm ve beatsPerBar gir.','Wrong tempo makes every quantized feature feel wrong.','Yanlış tempo her quantized özelliği yanlış hissettirir.'],
 ['Entry targets','Use defaultStartTrackIndex and entrySectionIndex intentionally.','defaultStartTrackIndex ve entrySectionIndex değerlerini bilinçli kullan.','-1 API overrides fall back to these authored defaults.','API override -1 ise bu yazılmış varsayılanlara düşer.'],
 ['Layer defaults','Pick defaultLayerMode and trackDefaultLayers per track.','defaultLayerMode ve trackDefaultLayers değerlerini track başına seç.','This decides whether a cue starts lean, full, or curated.','Cue sade mi, dolu mu, seçilmiş mi başlar bunu belirler.'],
 ['Validation pass','Use the Runtime Control Panel before gameplay code.','Gameplay kodundan önce Runtime Control Panel kullan.','Test state, track, section and layer names from the buyer-facing UI.','State, track, section ve layer isimlerini alıcının gördüğü UI ile test et.']
], 'tr')}
<h3>Ayar referansı - tracklar</h3>
${settingRows(trackSettings, 'tr')}`},

'states':{
en:`<p class="lead">States are the main musical moods of your game: Explore, Combat, Boss, Menu, Tension, Calm. This page is the central place for how to author them, switch them, time them, and debug why one state wins over another.</p>
<h3>What a state is</h3>
<p>A state is a named container inside your Music Profile. Each state holds one or more tracks. A single-track state behaves like one cue or loop. A multi-track state behaves like a playlist. A section-based track can still live inside a state, so a state can be simple at first and become a full intro-loop-outro form later.</p>
${code(`// Author these names in the profile, then treat them like API constants.
public static class MusicStates
{
    public const string Explore = "Explore";
    public const string Combat  = "Combat";
    public const string Boss    = "Boss";
}`)}
${call('warn','Names are exact','State names are case-sensitive strings. <code>Combat</code> and <code>combat</code> are different. If a state does not change, check spelling before anything else.')}
<h3>Authoring states in the profile</h3>
<p>Add entries under <code>stateConfigs</code>. Give each one a stable <code>stateName</code>, then add tracks. If no call chooses a specific track, the conductor uses the state/default track selection. If a section track starts without a section override, it uses that track's <code>entrySectionIndex</code>.</p>
${settingRows([
 ['stateConfigs','List of named states in the profile.','Profildeki isimli state listesi.','This is the top-level mood map.','Bu en ust mod haritasidir.'],
 ['stateName','Gameplay/API-facing name.','Gameplay/API tarafinin gordugu isim.','Keep it stable and store it in constants.','Sabit tut ve constants icinde sakla.'],
 ['tracks','Tracks available inside the state.','State icindeki trackler.','One track is one cue; many tracks make a playlist.','Tek track bir cue, cok track playlist demektir.'],
 ['defaultStartTrackIndex','Conductor fallback track when no call chooses one.','Cagri track secmediginde conductor fallback tracki.','Use 0 for the normal entry cue.','Normal giris cue icin 0 kullan.'],
 ['entrySectionIndex','Fallback starting section for section tracks.','Section trackler icin fallback baslangic sectioni.','Use an intro section or jump straight to the loop.','Intro section kullan veya direkt loopa gir.']
], 'en')}
<h3>Changing state from code</h3>
<p>Use <code>StartMusic</code> to begin the score and <code>SetMusicState</code> to change moods after playback is running. Immediate and quantized wrappers are just convenience shortcuts over the same state transition system.</p>
${code(`BST.StartMusic("Explore", fadeDuration: 0.5f);

BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f);
BST.SetMusicStateQuantized("Boss", crossfadeDuration: 1.2f);
BST.SetMusicStateImmediate("GameOver", crossfadeDuration: 0f, forceWhileInZone: true);`)}
${settingRows(stateParameterRows, 'en')}
${call('note','Same-state calls are safe','Calling the current state again does not restart the music by itself. If you pass a new track or section target, the conductor turns the call into a track or section jump. Otherwise it avoids needless restart noise.')}
<h3>Timing and crossfades</h3>
<p>Timing says <i>when</i> the state may switch. Crossfade says <i>how long</i> the old and new music overlap. They are separate choices.</p>
${settingRows([
 ['Immediate','Switches now, even mid-bar.','Hemen, bar ortasinda bile degisir.','Use for death, game over, panic cuts.','Olum, game over, panik kesitleri icin kullan.'],
 ['OnNextBar','Waits for the next bar.','Sonraki bari bekler.','Best default for normal state changes.','Normal state degisimleri icin en iyi varsayilan.'],
 ['OnSectionEnd','Waits for the current section to finish.','Mevcut sectionin bitmesini bekler.','With fades, the base/section bed can pre-roll so the logical change stays at section end while the audio overlaps.','Fade varsa base/section bed pre-roll yapabilir; logical değişim section sonunda kalırken audio overlap alınır.'],
 ['OnNextTransitionPoint','Waits for valid bar exits or transition-point sections.','Gecerli bar exitlerini veya transition-point sectionlari bekler.','Best for authored section scores.','Yazilmis section skorlarinda en iyi yol.'],
 ['crossfadeDuration','Per-call fade length; -1 inherits defaultCrossfadeDuration.','Cagri bazinda fade uzunlugu; -1 defaultCrossfadeDuration miras alir.','Use 0 for hard cuts or explicit values for special moments.','Sert kesit icin 0 veya ozel anlar icin acik deger kullan.']
], 'en')}
${settingRows(fadeInheritanceRows, 'en')}
<h3>Who wins: requests, zones, global state</h3>
<p>When several systems want music, the conductor resolves state in this order: highest-priority state request, then the active top music zone, then the global state last set by <code>SetMusicState</code> or <code>StartMusic</code>. If nothing resolves, the score stops with the appropriate timing.</p>
${settingRows([
 ['PushStateRequest','Best for systems that may overlap, such as combat and low health.','Combat ve dusuk can gibi cakisan sistemler icin en iyi yol.','Requests have priority and stable ids.','Requestler priority ve sabit id tasir.'],
 ['Music Zone','Best for world areas that should own music while the player is inside.','Oyuncu icindeyken muzigi sahiplenmesi gereken dunya alanlari icin iyi.','A higher-priority zone beats lower zones.','Yuksek priority zone dusuk zonelari gecer.'],
 ['SetMusicState','Best for normal global mood changes.','Normal global mod degisimleri icin iyi.','Can persist after zones leave if persistAfterLeavingZone is true.','persistAfterLeavingZone true ise zone sonrasi kalabilir.'],
 ['forceWhileInZone','Lets a state call or request beat the active zone.','State cagrisi veya requestin aktif zoneu gecmesini saglar.','Use for cutscenes and must-own moments.','Cutscene ve kesin sahiplenme anlari icin kullan.']
], 'en')}
${call('note','Requests do not store crossfade length','Requests carry id, state, priority, zone force and quantize timing. They do not carry a per-request crossfade override, so request-driven switches use the conductor default crossfade path.')}
<h3>Start track and start section targeting</h3>
<p><code>startTrackIndex</code> and <code>startSectionIndex</code> are optional overrides for state changes. Use them when a state is correct but the exact entry cue matters: boss intro, phase two, failure sting, or a direct loop entry.</p>
${code(`// Enter Combat on its normal track and entry section.
BST.SetMusicState("Combat");

// Enter Boss on track 1 and section 2.
BST.SetMusicState("Boss", BSTTransitionMode.OnSectionEnd,
    crossfadeDuration: -1f,
    startTrackIndex: 1,
    startSectionIndex: 2);`)}
<h3>Testing states in the Control Panel</h3>
<p>The Control Panel's States tab is a no-code state lab. It automatically lists every state in the active profile, so new states appear as buttons the moment you add them - no manual setup. Choose the transition mode, test <code>forceStateWhileInZone</code>, choose whether the state persists after leaving zones, and step through start track/section targets.</p>
<h3>Common state problems</h3>
${settingRows([
 ['State does not change','Name typo, active zone wins, or higher-priority request wins.','Isim hatasi, aktif zone kazaniyor veya daha yuksek priority request kazaniyor.','Check active requests/zones before blaming the profile.','Profili suclamadan once aktif request/zonelari kontrol et.'],
 ['Wrong track starts','startTrackIndex or defaultStartTrackIndex points somewhere unexpected.','startTrackIndex veya defaultStartTrackIndex beklenmeyen yere bakiyor.','Use -1 for defaults, explicit index for authored entry.','Varsayilan icin -1, yazilmis giris icin acik index kullan.'],
 ['Wrong section starts','startSectionIndex or entrySectionIndex is not the intended phrase.','startSectionIndex veya entrySectionIndex hedef cumle degil.','Check section track entry settings.','Section track entry ayarlarini kontrol et.'],
 ['Transition feels late','The mode may be waiting for a bar, section end or transition point.','Mod bar, section sonu veya transition point bekliyor olabilir.','Use Immediate only when musical waiting is wrong.','Muzikal bekleme yanlissa Immediate kullan.'],
 ['Fade feels wrong','The call may be inheriting defaultCrossfadeDuration.','Cagri defaultCrossfadeDuration miras aliyor olabilir.','Pass an explicit crossfadeDuration for special moments.','Ozel anlar icin acik crossfadeDuration ver.']
], 'en')}`,
tr:`<p class="lead">State'ler oyunun ana müzikal modlarıdır: Explore, Combat, Boss, Menu, Tension, Calm. Bu sayfa state'leri yazmak, değiştirmek, zamanlamak ve neden bir state'in diğerine üstün geldiğini debug etmek için merkezi yerdir.</p>
<h3>State nedir</h3>
<p>State, Music Profile içinde isimli bir konteynerdir. Her state bir veya daha fazla track taşır. Tek trackli state bir cue veya loop gibi davranır. Çok trackli state playlist gibi davranır. Section tabanlı track de state içinde yaşayabilir; yani state önce basit başlayıp sonra tam intro-loop-outro forma büyüyebilir.</p>
${code(`// Bu isimleri profilde yaz, sonra API constant gibi kullan.
public static class MusicStates
{
    public const string Explore = "Explore";
    public const string Combat  = "Combat";
    public const string Boss    = "Boss";
}`)}
${call('warn','İsimler birebirdir','State isimleri büyük-küçük harfe duyarlı stringlerdir. <code>Combat</code> ve <code>combat</code> farklıdır. State değişmiyorsa önce yazımı kontrol et.')}
<h3>Profilde state yazmak</h3>
<p><code>stateConfigs</code> altına girişler ekle. Her birine stabil bir <code>stateName</code> ver, sonra trackleri ekle. Hiçbir çağrı belirli track seçmezse conductor state/default track seçimini kullanır. Section track, section override olmadan başlarsa o trackin <code>entrySectionIndex</code> değerini kullanır.</p>
${settingRows([
 ['stateConfigs','List of named states in the profile.','Profildeki isimli state listesi.','This is the top-level mood map.','Bu en üst mod haritasıdır.'],
 ['stateName','Gameplay/API-facing name.','Gameplay/API tarafının gördüğü isim.','Keep it stable and store it in constants.','Sabit tut ve constants içinde sakla.'],
 ['tracks','Tracks available inside the state.','State içindeki trackler.','One track is one cue; many tracks make a playlist.','Tek track bir cue, çok track playlist demektir.'],
 ['defaultStartTrackIndex','Conductor fallback track when no call chooses one.','Çağrı track seçmediğinde conductor fallback tracki.','Use 0 for the normal entry cue.','Normal giriş cue için 0 kullan.'],
 ['entrySectionIndex','Fallback starting section for section tracks.','Section trackler için fallback başlangıç sectionı.','Use an intro section or jump straight to the loop.','Intro section kullan veya direkt loopa gir.']
], 'tr')}
<h3>Koddan state değiştirmek</h3>
<p>Skoru başlatmak için <code>StartMusic</code>, playback çalışırken mod değiştirmek için <code>SetMusicState</code> kullan. Immediate ve quantized wrapperlar aynı state transition sisteminin kısa yollarıdır.</p>
${code(`BST.StartMusic("Explore", fadeDuration: 0.5f);

BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f);
BST.SetMusicStateQuantized("Boss", crossfadeDuration: 1.2f);
BST.SetMusicStateImmediate("GameOver", crossfadeDuration: 0f, forceWhileInZone: true);`)}
${settingRows(stateParameterRows, 'tr')}
${call('note','Aynı state çağrısı güvenlidir','Mevcut state\'i tekrar çağırmak kendi başına müziği restart etmez. Yeni track veya section hedefi verirsen conductor çağrıyı track ya da section jump\'a çevirir. Aksi halde gereksiz restart sesinden kaçınır.')}
<h3>Zamanlama ve crossfade</h3>
<p>Zamanlama state'in <i>ne zaman</i> değişebileceğini söyler. Crossfade eski ve yeni müziğin <i>ne kadar süre</i> üst üste bineceğini söyler. Bunlar ayrı seçimlerdir.</p>
${settingRows([
 ['Immediate','Switches now, even mid-bar.','Hemen, bar ortasında bile değişir.','Use for death, game over, panic cuts.','Ölüm, game over, panik kesitleri için kullan.'],
 ['OnNextBar','Waits for the next bar.','Sonraki barı bekler.','Best default for normal state changes.','Normal state değişimleri için en iyi varsayılan.'],
 ['OnSectionEnd','Waits for the current section to finish.','Mevcut sectionın bitmesini bekler.','With fades, the base/section bed can pre-roll so the logical change stays at section end while the audio overlaps.','Fade varsa base/section bed pre-roll yapabilir; logical değişim section sonunda kalırken audio overlap alınır.'],
 ['OnNextTransitionPoint','Waits for valid bar exits or transition-point sections.','Geçerli bar exitlerini veya transition-point sectionları bekler.','Best for authored section scores.','Yazılmış section skorlarında en iyi yol.'],
 ['crossfadeDuration','Per-call fade length; -1 inherits defaultCrossfadeDuration.','Çağrı bazında fade uzunluğu; -1 defaultCrossfadeDuration miras alır.','Use 0 for hard cuts or explicit values for special moments.','Sert kesit için 0 veya özel anlar için açık değer kullan.']
], 'tr')}
${settingRows(fadeInheritanceRows, 'tr')}
<h3>Kim kazanır: request, zone, global state</h3>
<p>Birden fazla sistem müzik istediğinde conductor state'i şu sırayla çözer: en yüksek öncelikli state request, sonra aktif top music zone, sonra en son <code>SetMusicState</code> veya <code>StartMusic</code> ile ayarlanan global state. Hiçbiri çözülmezse skor uygun zamanlamayla durur.</p>
${settingRows([
 ['PushStateRequest','Best for systems that may overlap, such as combat and low health.','Combat ve düşük can gibi çakışan sistemler için en iyi yol.','Requests have priority and stable ids.','Requestler priority ve sabit id taşır.'],
 ['Music Zone','Best for world areas that should own music while the player is inside.','Oyuncu içindeyken müziği sahiplenmesi gereken dünya alanları için iyi.','A higher-priority zone beats lower zones.','Yüksek priority zone düşük zoneları geçer.'],
 ['SetMusicState','Best for normal global mood changes.','Normal global mod değişimleri için iyi.','Can persist after zones leave if persistAfterLeavingZone is true.','persistAfterLeavingZone true ise zone sonrası kalabilir.'],
 ['forceWhileInZone','Lets a state call or request beat the active zone.','State çağrısı veya requestin aktif zoneu geçmesini sağlar.','Use for cutscenes and must-own moments.','Cutscene ve kesin sahiplenme anları için kullan.']
], 'tr')}
${call('note','Requestler crossfade süresi saklamaz','Requestler id, state, priority, zone force ve quantize timing taşır. Request başına crossfade override taşımaz; bu yüzden request-driven geçişler conductor default crossfade yolunu kullanır.')}
<h3>Start track ve start section hedefleme</h3>
<p><code>startTrackIndex</code> ve <code>startSectionIndex</code> state değişimleri için opsiyonel override değerleridir. State doğru ama giriş cue'su önemliyse kullan: boss intro, phase two, failure sting veya direkt loop girişi.</p>
${code(`// Combat'a normal track ve entry section ile gir.
BST.SetMusicState("Combat");

// Boss'a track 1 ve section 2 ile gir.
BST.SetMusicState("Boss", BSTTransitionMode.OnSectionEnd,
    crossfadeDuration: -1f,
    startTrackIndex: 1,
    startSectionIndex: 2);`)}
<h3>Control Panel içinde state testi</h3>
<p>Control Panel'in States tabı kodsuz state laboratuvarıdır. Aktif profildeki tüm state'leri otomatik listeler; yeni bir state ekler eklemez buton olarak görünür, elle kurulum gerekmez. Transition mode seç, <code>forceStateWhileInZone</code> davranışını test et, state'in zone sonrası kalıp kalmayacağını seç ve start track/section hedeflerini dene.</p>
<h3>Yaygın state sorunları</h3>
${settingRows([
 ['State does not change','Name typo, active zone wins, or higher-priority request wins.','İsim hatası, aktif zone kazanıyor veya daha yüksek priority request kazanıyor.','Check active requests/zones before blaming the profile.','Profili suçlamadan önce aktif request/zoneları kontrol et.'],
 ['Wrong track starts','startTrackIndex or defaultStartTrackIndex points somewhere unexpected.','startTrackIndex veya defaultStartTrackIndex beklenmeyen yere bakıyor.','Use -1 for defaults, explicit index for authored entry.','Varsayılan için -1, yazılmış giriş için açık index kullan.'],
 ['Wrong section starts','startSectionIndex or entrySectionIndex is not the intended phrase.','startSectionIndex veya entrySectionIndex hedef cümle değil.','Check section track entry settings.','Section track entry ayarlarını kontrol et.'],
 ['Transition feels late','The mode may be waiting for a bar, section end or transition point.','Mod bar, section sonu veya transition point bekliyor olabilir.','Use Immediate only when musical waiting is wrong.','Müzikal bekleme yanlışsa Immediate kullan.'],
 ['Fade feels wrong','The call may be inheriting defaultCrossfadeDuration.','Çağrı defaultCrossfadeDuration miras alıyor olabilir.','Pass an explicit crossfadeDuration for special moments.','Özel anlar için açık crossfadeDuration ver.']
], 'tr')}`},

'gameplay-api':{
en:`<p class="lead">Everything you do at runtime goes through one static class: <code>BST</code>. There is nothing to find, cache or wire up - you describe musical intent and the toolkit performs it.</p>
<h3>How the API behaves</h3>
<p>The first <code>BST</code> call quietly creates the manager, so you can call it from anywhere. Setter calls (start music, change state, add a layer) take effect through the active Conductor. Getter calls (is it playing, what bar are we on) are always safe, even before music starts, and simply return sensible defaults if there is no Conductor yet.</p>
<p>Most setters accept a <code>quantize</code> flag or a transition mode so you choose between an instant change and one that lands on the beat. Several methods have a <code>Try</code> variant that returns a bool and respects an active zone instead of forcing past it.</p>
<h3>The calls you will use most</h3>
${code(`using Nonfigure.BeatSyncToolkit;

// Transport
BST.StartMusic("Explore", fadeDuration: 0.5f);
BST.StopMusic(fadeDuration: 1.5f);

// States (mood changes)
BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar);
BST.SetMusicStateImmediate("GameOver");

// Layers (vertical arrangement)
BST.AddLayer("Drums", quantize: true);
BST.RemoveLayer("Drums");

// Intensity (continuous pressure, 0..1)
BST.SetIntensity(0.75f, quantize: true, smooth: true, smoothSpeed: 3f);

// Sections, stingers, ducking
BST.JumpToSectionByName("Outro");
BST.PlayStinger("Victory");
BST.StartDucking(targetVolume: 0.3f, fadeTime: 0.25f);`)}
<h3>State transition parameters</h3>
<p>State calls are the runtime calls buyers reach for first, so their optional parameters deserve real attention. A state change can choose timing, override crossfade length, decide whether it beats an active zone, and pick the track or section that should begin inside the target state.</p>
${code(`// Musical next-bar state change with a short custom crossfade.
BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f);

// Hard cut now, even if a zone is active.
BST.SetMusicStateImmediate("GameOver", crossfadeDuration: 0f, forceWhileInZone: true);

// Enter Boss on track 1, section 2. -1 would inherit the authored defaults.
BST.SetMusicState("Boss", BSTTransitionMode.OnSectionEnd,
    crossfadeDuration: -1f,
    startTrackIndex: 1,
    startSectionIndex: 2);`)}
${settingRows(stateParameterRows, 'en')}
${call('note','Calling the same state again','A same-state call does not restart the music just because the name matches the current state. If you pass a new track or section target, the conductor treats it as a track/section jump; otherwise it avoids a pointless restart.')}
<h3>Fade inheritance map</h3>
<p><code>-1</code> never means magic. It means "use the authored default for this kind of fade". Start fades, stop fades, crossfades, stinger fades and ducking fades each inherit from a different conductor field.</p>
${settingRows(fadeInheritanceRows, 'en')}
<h3>Reading the live state</h3>
<p>Use getters to drive debug UI or to sync gameplay to the beat. They never throw before playback starts.</p>
${code(`bool playing = BST.IsPlaying();
string state = BST.GetMusicStateName();
float bpm    = BST.GetBpm();
int bar      = BST.GetCurrentBar();
int beat     = BST.GetCurrentBeat();
var layers   = BST.GetActiveLayers();`)}
${settingRows(getterDefaultRows, 'en')}
<h3>Advanced direct conductor events</h3>
<p>Most gameplay should stay on the static <code>BST</code> facade. If you need callbacks, subscribe on the active <code>BSTConductor</code> directly from a serialized reference or from <code>BST.GetConductor()</code>.</p>
${code(`var conductor = BST.GetConductor();
conductor.StateChanged += (oldState, newState) => Debug.Log(newState);
conductor.Bar += () => PulseHudOnBar();`)}
${settingRows(conductorEventRows, 'en')}
<h3>Worked example - entering a boss room</h3>
<p>One method can own the whole moment: take the score with a high-priority request, push intensity to the top, and punctuate the reveal with a stinger.</p>
${code(`public void EnterBossRoom()
{
    BST.PushStateRequest("boss", "Boss", priority: 100, forceWhileInZone: true);
    BST.SetIntensity(1f, quantize: true, smooth: true, smoothSpeed: 2f);
    BST.PlayStinger("BossReveal");
}`)}
${call('tip','Prefer intent over plumbing','You never create or schedule an AudioSource. If you find yourself reaching for raw Unity audio, there is almost always a single BST call that does it musically instead.')}
<h3>Settings reference - API groups</h3>
${settingRows([
 ['GetConductor / HasConductor','Find or check the active conductor.','Aktif conductoru bulur veya var mı kontrol eder.','Use guards before debug or status UI.','Debug/status UI öncesi guard olarak kullan.'],
 ['StartMusic / StopMusic','Start or stop playback.','Playback başlatır veya durdurur.','Use at scene or game-flow boundaries.','Sahne/oyun akışı sınırlarında kullan.'],
 ['SetMusicState / TrySetMusicState','Switch to a named state with transition options.','Transition seçenekleriyle isimli state’e geçer.','Use for game mood changes.','Oyun modu değişimlerinde kullan.'],
 ['AddLayer / AddLayers / RemoveLayer / ClearLayers','Control stem layers.','Stem layerlarını kontrol eder.','Use for vertical arrangement.','Dikey aranjman için kullan.'],
 ['JumpToTrack / LockCurrentTrack / UnlockCurrentTrack','Control playlist track selection.','Playlist track seçimini kontrol eder.','Use for scripted cues and boss phases.','Scripted cue ve boss phase için kullan.'],
 ['PushStateRequest / RemoveStateRequest / ClearStateRequests','Priority state requests.','Öncelikli state requestleri.','Use when multiple systems want music.','Birden çok sistem müzik istediğinde kullan.'],
 ['JumpToSection / JumpToSectionByName','Move within section tracks.','Section track içinde hareket eder.','Use for musical form control.','Müzikal form kontrolü için kullan.'],
 ['SetCustomFlag / GetCustomFlag / ClearCustomFlags','Flags for branch conditions.','Branch koşulları için flagler.','Use for story, puzzle or boss-phase decisions.','Hikaye, puzzle veya boss-phase kararları için kullan.'],
 ['SetIntensity / GetIntensity','Drive 0-1 intensity.','0-1 intensity değerini sürer.','Use for continuous pressure.','Sürekli baskı için kullan.'],
 ['PlayStinger / GetAvailableStingerCueNames','Play one-shot cues.','Tek seferlik cue çalar.','Use for event accents.','Olay vurguları için kullan.'],
 ['StartDucking / StopDucking / SetDuckLayers','Lower music for speech or key audio.','Konuşma/önemli ses için müziği kısar.','Use when another sound must be clear.','Başka bir ses net duyulmalıysa kullan.'],
 ['GetBpm / GetCurrentBar / GetCurrentBeat / IsPlaying','Timing and status getters.','Zamanlama ve durum getterları.','Use for debug UI and gameplay sync.','Debug UI ve gameplay sync için kullan.']
], 'en')}`,
tr:`<p class="lead">Çalışma anında yaptığın her şey tek bir statik sınıftan geçer: <code>BST</code>. Bulunacak, cachelenecek ya da bağlanacak bir şey yok - müzikal niyeti tarif edersin, toolkit icra eder.</p>
<h3>API nasıl davranır</h3>
<p>İlk <code>BST</code> çağrısı manageri sessizce oluşturur; böylece her yerden çağırabilirsin. Setter çağrıları (müziği başlat, state değiştir, layer ekle) aktif Conductor üzerinden etki eder. Getter çağrıları (çalıyor mu, hangi bardayız) müzik başlamadan önce bile her zaman güvenlidir ve Conductor yoksa mantıklı varsayılanlar döndürür.</p>
<p>Çoğu setter bir <code>quantize</code> bayrağı ya da transition modu alır; böylece anlık değişim ile vuruşa oturan değişim arasında seçim yaparsın. Bazı metotların bir <code>Try</code> varyantı vardır; bool döndürür ve aktif bir bölgeyi zorla geçmek yerine ona saygı gösterir.</p>
<h3>En çok kullanacağın çağrılar</h3>
${code(`using Nonfigure.BeatSyncToolkit;

// Transport
BST.StartMusic("Explore", fadeDuration: 0.5f);
BST.StopMusic(fadeDuration: 1.5f);

// State (mod değişimi)
BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar);
BST.SetMusicStateImmediate("GameOver");

// Layer (dikey aranjman)
BST.AddLayer("Drums", quantize: true);
BST.RemoveLayer("Drums");

// Intensity (sürekli baskı, 0..1)
BST.SetIntensity(0.75f, quantize: true, smooth: true, smoothSpeed: 3f);

// Section, stinger, ducking
BST.JumpToSectionByName("Outro");
BST.PlayStinger("Victory");
BST.StartDucking(targetVolume: 0.3f, fadeTime: 0.25f);`)}
<h3>State geçiş parametreleri</h3>
<p>State çağrıları alıcıların runtime tarafında ilk kullanacağı çağrılardır; bu yüzden opsiyonel parametreler gerçekten anlatılmalı. Bir state değişimi zamanlamayı seçebilir, crossfade süresini override edebilir, aktif bölgeyi geçip geçmeyeceğine karar verebilir ve hedef state içinde başlayacak track veya sectionı seçebilir.</p>
${code(`// Kısa özel crossfade ile sonraki barda müzikal state değişimi.
BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f);

// Aktif zone olsa bile şimdi sert kes.
BST.SetMusicStateImmediate("GameOver", crossfadeDuration: 0f, forceWhileInZone: true);

// Boss stateine track 1, section 2 üzerinden gir. -1 yazılmış varsayılanları miras alırdı.
BST.SetMusicState("Boss", BSTTransitionMode.OnSectionEnd,
    crossfadeDuration: -1f,
    startTrackIndex: 1,
    startSectionIndex: 2);`)}
${settingRows(stateParameterRows, 'tr')}
${call('note','Aynı state tekrar çağrılırsa','Aynı state çağrısı sadece isim mevcut state ile aynı diye müziği yeniden başlatmaz. Yeni track veya section hedefi verirsen conductor bunu track/section jump gibi ele alır; aksi halde gereksiz restarttan kaçınır.')}
<h3>Fade miras haritası</h3>
<p><code>-1</code> büyü değildir. "Bu fade türü için yazılmış varsayılanı kullan" demektir. Start fade, stop fade, crossfade, stinger fade ve ducking fade farklı conductor alanlarından miras alır.</p>
${settingRows(fadeInheritanceRows, 'tr')}
<h3>Canlı durumu okuma</h3>
<p>Getterları debug UI'ı sürmek ya da gameplayi vuruşa senkronlamak için kullan. Playback başlamadan önce asla hata fırlatmazlar.</p>
${code(`bool playing = BST.IsPlaying();
string state = BST.GetMusicStateName();
float bpm    = BST.GetBpm();
int bar      = BST.GetCurrentBar();
int beat     = BST.GetCurrentBeat();
var layers   = BST.GetActiveLayers();`)}
${settingRows(getterDefaultRows, 'tr')}
<h3>İleri direct conductor eventleri</h3>
<p>Çoğu gameplay statik <code>BST</code> facade üzerinde kalmalı. Callback gerekiyorsa aktif <code>BSTConductor</code> üzerinden, serialize edilmiş referansla veya <code>BST.GetConductor()</code> ile abone ol.</p>
${code(`var conductor = BST.GetConductor();
conductor.StateChanged += (oldState, newState) => Debug.Log(newState);
conductor.Bar += () => PulseHudOnBar();`)}
${settingRows(conductorEventRows, 'tr')}
<h3>Örnek - boss odasına girmek</h3>
<p>Tek bir metot tüm anı sahiplenebilir: skoru yüksek öncelikli bir request ile al, intensityyi tavana çıkar ve reveal'i bir stingerla noktala.</p>
${code(`public void EnterBossRoom()
{
    BST.PushStateRequest("boss", "Boss", priority: 100, forceWhileInZone: true);
    BST.SetIntensity(1f, quantize: true, smooth: true, smoothSpeed: 2f);
    BST.PlayStinger("BossReveal");
}`)}
${call('tip','Tesisat değil niyet','Hiçbir zaman AudioSource oluşturmaz veya schedule etmezsin. Ham Unity sesine uzandığını fark edersen, neredeyse her zaman bunu müzikal yapan tek bir BST çağrısı vardır.')}
<h3>Ayar referansı - API grupları</h3>
${settingRows([
 ['GetConductor / HasConductor','Find or check the active conductor.','Aktif conductoru bulur veya var mı kontrol eder.','Use guards before debug or status UI.','Debug/status UI öncesi guard olarak kullan.'],
 ['StartMusic / StopMusic','Start or stop playback.','Playback başlatır veya durdurur.','Use at scene or game-flow boundaries.','Sahne/oyun akışı sınırlarında kullan.'],
 ['SetMusicState / TrySetMusicState','Switch to a named state with transition options.','Transition seçenekleriyle isimli state’e geçer.','Use for game mood changes.','Oyun modu değişimlerinde kullan.'],
 ['AddLayer / AddLayers / RemoveLayer / ClearLayers','Control stem layers.','Stem layerlarını kontrol eder.','Use for vertical arrangement.','Dikey aranjman için kullan.'],
 ['JumpToTrack / LockCurrentTrack / UnlockCurrentTrack','Control playlist track selection.','Playlist track seçimini kontrol eder.','Use for scripted cues and boss phases.','Scripted cue ve boss phase için kullan.'],
 ['PushStateRequest / RemoveStateRequest / ClearStateRequests','Priority state requests.','Öncelikli state requestleri.','Use when multiple systems want music.','Birden çok sistem müzik istediğinde kullan.'],
 ['JumpToSection / JumpToSectionByName','Move within section tracks.','Section track içinde hareket eder.','Use for musical form control.','Müzikal form kontrolü için kullan.'],
 ['SetCustomFlag / GetCustomFlag / ClearCustomFlags','Flags for branch conditions.','Branch koşulları için flagler.','Use for story, puzzle or boss-phase decisions.','Hikaye, puzzle veya boss-phase kararları için kullan.'],
 ['SetIntensity / GetIntensity','Drive 0-1 intensity.','0-1 intensity değerini sürer.','Use for continuous pressure.','Sürekli baskı için kullan.'],
 ['PlayStinger / GetAvailableStingerCueNames','Play one-shot cues.','Tek seferlik cue çalar.','Use for event accents.','Olay vurguları için kullan.'],
 ['StartDucking / StopDucking / SetDuckLayers','Lower music for speech or key audio.','Konuşma/önemli ses için müziği kısar.','Use when another sound must be clear.','Başka bir ses net duyulmalıysa kullan.'],
 ['GetBpm / GetCurrentBar / GetCurrentBeat / IsPlaying','Timing and status getters.','Zamanlama ve durum getterları.','Use for debug UI and gameplay sync.','Debug UI ve gameplay sync için kullan.']
], 'tr')}`},

'conductor-settings':{
en:`<p class="lead">Conductor settings are the global musical defaults for your whole score. They are not per-song composition data - they are the house style every state inherits unless it says otherwise.</p>
<h3>How to think about the groups</h3>
<p>The inspector is grouped by purpose. <b>Settings</b> covers the profile, auto-start and the default fades and quantization. <b>Stingers</b> and <b>Ducking</b> set the defaults a cue inherits when it passes -1. <b>Performance</b> controls warmup and how stems are prepared. <b>Playlist</b> governs multi-track states. <b>Intensity</b> and <b>Default Layers</b> are the fallbacks tracks use when they defer to the conductor.</p>
<p>Two settings shape the overall feel more than any other: <code>quantizeStateChangesToBar</code> (whether mood changes wait for the next bar) and <code>defaultCrossfadeDuration</code> (the house fade length used whenever a call passes -1).</p>
<h3>Recommended starting point</h3>
<p>Assign your profile, set <code>autoStartState</code>, keep <code>quantizeStateChangesToBar</code> on for a composed feel, leave <code>defaultCrossfadeDuration</code> around two seconds, and keep <code>prepareMutedLayersOnTrackStart</code> on if you use stems. Turn <code>debugLog</code> on while wiring the game and off for release.</p>
${call('crit','Use one Conductor','If two Conductors are active at once you get overlapping music. The newest one registers and a warning is logged. Disable the old conductor rather than running both.')}
<h3>Fallbacks and inheritance</h3>
<p>The Conductor is where all <code>-1</code> runtime values resolve. <code>StartMusic(fadeDuration: -1)</code> uses <code>startFadeDuration</code>, <code>StopMusic(-1)</code> uses <code>stopFadeDuration</code>, state/track/section crossfades use <code>defaultCrossfadeDuration</code>, stinger fade-in uses <code>defaultStingerFadeIn</code>, and ducking fade time uses the ducking fade defaults. That is why a buyer can tune the whole product feel from this one component, then override special moments in code.</p>
<h3>Performance and sync choices</h3>
<p><code>preloadAudioDataOnStart</code> and <code>profileWarmupItemsPerFrame</code> reduce first-play hitches by warming profile audio over several frames. <code>precreateLayerSourcesOnStart</code> spreads AudioSource creation instead of paying the cost when the first layer appears. <code>prepareMutedLayersOnTrackStart</code> is the sync-safe stem path: muted layers are scheduled at track start, so later layer enables fade in from an already-aligned source.</p>
${settingRows([
 ['preloadAudioDataOnStart','Warms profile clips after Start without blocking scene load.','Profil cliplerini Start sonrasında sahne yüklemeyi bloklamadan ısıtır.','Turn on for real game scenes with larger profiles; turn off only if you deliberately manage AudioClip loading yourself.','Büyük profilli gerçek oyun sahnelerinde aç; AudioClip yüklemeyi bilerek kendin yönetiyorsan kapat.'],
 ['precreateLayerSourcesOnStart','Creates layer AudioSource pools gradually.','Layer AudioSource havuzlarını kademeli oluşturur.','Turn on when first layer activation spikes; leave off for tiny profiles where setup cost is irrelevant.','İlk layer açılışı spike yapıyorsa aç; çok küçük profilde kurulum maliyeti önemsizse kapalı kalabilir.'],
 ['prepareMutedLayersOnTrackStart','Schedules muted stems at the same DSP start time as the track.','Sessiz stemleri track ile aynı DSP başlangıcına schedule eder.','Keep on for stem music; turning it off can make later layer enables cheaper but no longer sample-perfect prepared.','Stem müziğinde açık tut; kapatmak sonradan layer açmayı ucuzlatabilir ama sample-perfect hazırlığı bırakır.'],
 ['profileWarmupItemsPerFrame','Controls warmup work per frame.','Kare başına warmup iş miktarını kontrol eder.','Raise it to finish warmup sooner; lower it if scene start frames feel heavy.','Warmup erken bitsin istiyorsan yükselt; sahne başlangıç kareleri ağırsa düşür.'],
 ['startOnBeginPlayDelayFrames','Waits a few frames before auto-start.','Auto-start öncesi birkaç kare bekler.','Use small values so Unity audio and scene setup settle; set 0 only when immediate autoplay is more important.','Unity audio ve sahne kurulumu otursun diye küçük değer kullan; sadece anında autoplay daha önemliyse 0 yap.']
], 'en')}
${call('tip','Performance settings are not quality settings','They do not change the composition. They decide when setup cost is paid and whether stem layers are already running silently for perfect sync. Tune them with the profiler and with your ears: a hitch is a frame problem, but a late stem is a musical problem.')}
<h3>Advanced direct conductor usage</h3>
<p>Normal gameplay should call <code>BST</code>, but advanced tools may subscribe to the active Conductor for status: <code>StateChanged</code>, <code>TrackChanged</code>, <code>Bar</code>, <code>Beat</code>, <code>HasPendingStateTransition</code>, <code>IsDucking</code> and <code>DuckingMultiplier</code>. Keep this for debug UI, visual sync and editor tools; do not make ordinary gameplay depend on internal scheduling details.</p>
<h3>Settings reference</h3>
${settingRows(conductorSettings, 'en')}`,
tr:`<p class="lead">Conductor ayarları tüm skorunun global müzikal varsayılanlarıdır. Bunlar şarkı başına kompozisyon verisi değildir - aksini söylemediği sürece her state'in miras aldığı genel stildir.</p>
<h3>Grupları nasıl düşünmeli</h3>
<p>Inspector amaca göre gruplanmıştır. <b>Settings</b> profili, auto-start'ı ve varsayılan fade ile quantize'ı kapsar. <b>Stingers</b> ve <b>Ducking</b>, bir cue -1 geçtiğinde miras alacağı varsayılanları belirler. <b>Performance</b> warmup'ı ve stemlerin nasıl hazırlandığını yönetir. <b>Playlist</b> çok-trackli stateleri yönetir. <b>Intensity</b> ve <b>Default Layers</b>, trackler conductora bıraktığında kullandığı yedeklerdir.</p>
<p>İki ayar genel hissi diğerlerinden çok belirler: <code>quantizeStateChangesToBar</code> (mod değişimleri sonraki barı bekler mi) ve <code>defaultCrossfadeDuration</code> (bir çağrı -1 geçtiğinde kullanılan genel fade uzunluğu).</p>
<h3>Önerilen başlangıç</h3>
<p>Profilini ata, <code>autoStartState</code>'i ayarla, bestelenmiş his için <code>quantizeStateChangesToBar</code>'ı açık tut, <code>defaultCrossfadeDuration</code>'ı iki saniye civarında bırak ve stem kullanıyorsan <code>prepareMutedLayersOnTrackStart</code>'ı açık tut. Oyunu bağlarken <code>debugLog</code>'u aç, yayında kapat.</p>
${call('crit','Tek Conductor kullan','Aynı anda iki Conductor aktifse müzik üst üste biner. En yenisi kaydolur ve bir uyarı yazılır. İkisini birden çalıştırmak yerine eskisini devre dışı bırak.')}
<h3>Fallback ve miras alma</h3>
<p>Runtime tarafındaki tüm <code>-1</code> değerler Conductorda çözülür. <code>StartMusic(fadeDuration: -1)</code> <code>startFadeDuration</code> kullanır, <code>StopMusic(-1)</code> <code>stopFadeDuration</code> kullanır, state/track/section crossfade değerleri <code>defaultCrossfadeDuration</code> kullanır, stinger fade-in <code>defaultStingerFadeIn</code> kullanır ve ducking fade time ducking fade varsayılanlarını kullanır. Bu yüzden alıcı bütün ürün hissini bu tek componentten ayarlayıp özel anlarda koddan override edebilir.</p>
<h3>Performans ve sync seçimleri</h3>
<p><code>preloadAudioDataOnStart</code> ve <code>profileWarmupItemsPerFrame</code>, profil sesini birkaç kareye yayarak ilk çalma takılmasını azaltır. <code>precreateLayerSourcesOnStart</code> AudioSource oluşturmayı ilk layer anına yığmak yerine yayar. <code>prepareMutedLayersOnTrackStart</code> stemler için sync-safe yoldur: sessiz layerlar track başında schedule edilir, böylece sonra açılan layer zaten hizalı kaynaktan fade ile yükselir.</p>
${settingRows([
 ['preloadAudioDataOnStart','Warms profile clips after Start without blocking scene load.','Profil cliplerini Start sonrasında sahne yüklemeyi bloklamadan ısıtır.','Turn on for real game scenes with larger profiles; turn off only if you deliberately manage AudioClip loading yourself.','Büyük profilli gerçek oyun sahnelerinde aç; AudioClip yüklemeyi bilerek kendin yönetiyorsan kapat.'],
 ['precreateLayerSourcesOnStart','Creates layer AudioSource pools gradually.','Layer AudioSource havuzlarını kademeli oluşturur.','Turn on when first layer activation spikes; leave off for tiny profiles where setup cost is irrelevant.','İlk layer açılışı spike yapıyorsa aç; çok küçük profilde kurulum maliyeti önemsizse kapalı kalabilir.'],
 ['prepareMutedLayersOnTrackStart','Schedules muted stems at the same DSP start time as the track.','Sessiz stemleri track ile aynı DSP başlangıcına schedule eder.','Keep on for stem music; turning it off can make later layer enables cheaper but no longer sample-perfect prepared.','Stem müziğinde açık tut; kapatmak sonradan layer açmayı ucuzlatabilir ama sample-perfect hazırlığı bırakır.'],
 ['profileWarmupItemsPerFrame','Controls warmup work per frame.','Kare başına warmup iş miktarını kontrol eder.','Raise it to finish warmup sooner; lower it if scene start frames feel heavy.','Warmup erken bitsin istiyorsan yükselt; sahne başlangıç kareleri ağırsa düşür.'],
 ['startOnBeginPlayDelayFrames','Waits a few frames before auto-start.','Auto-start öncesi birkaç kare bekler.','Use small values so Unity audio and scene setup settle; set 0 only when immediate autoplay is more important.','Unity audio ve sahne kurulumu otursun diye küçük değer kullan; sadece anında autoplay daha önemliyse 0 yap.']
], 'tr')}
${call('tip','Performance ayarları kalite ayarı değildir','Kompozisyonu değiştirmezler. Kurulum maliyetinin ne zaman ödeneceğini ve stem layerların kusursuz sync için sessizce hazır çalıp çalmayacağını belirlerler. Profiler ve kulağınla ayarla: hitch bir frame sorunudur, geç giren stem ise müzikal sorundur.')}
<h3>İleri doğrudan conductor kullanımı</h3>
<p>Normal gameplay <code>BST</code> çağırmalı, ama ileri seviye araçlar aktif Conductora abone olabilir: <code>StateChanged</code>, <code>TrackChanged</code>, <code>Bar</code>, <code>Beat</code>, <code>HasPendingStateTransition</code>, <code>IsDucking</code> ve <code>DuckingMultiplier</code>. Bunu debug UI, görsel sync ve editor araçları için tut; sıradan gameplayi iç scheduling detaylarına bağlama.</p>
<h3>Ayar referansı</h3>
${settingRows(conductorSettings, 'tr')}`},

'layers':{
en:`<p class="lead">Layers are vertical arrangement. They let the same song become thinner or fuller - drums in, pads out - without ever changing track.</p>
<h3>How layers actually play</h3>
<p>A layer is a stem clip defined on a track. When the track starts and <code>prepareMutedLayersOnTrackStart</code> is on, every stem begins together at its near-silent <code>standbyVolume</code>. Enabling a layer does not restart it - it simply fades from standby up to <code>targetVolume</code>. That is why added layers are always perfectly in time with the music: they were already playing, just inaudible.</p>
<h3>Who owns a layer</h3>
<p>A layer can be switched on by three different owners, tracked separately so they never fight: your manual <code>AddLayer</code> calls, the intensity system, and an active zone. <code>addMode</code> decides how a manual add interacts with intensity. <code>ManualOverride</code> takes ownership so the layer stays until you remove it. <code>PreserveIntensity</code> only preserves ownership when the layer is already being controlled by intensity at that moment; otherwise the add behaves like a manual add.</p>
${call('warn','PreserveIntensity is state-dependent','If intensity is 0, or below this layer’s <code>thresholdOn</code>, the layer is usually not intensity-controlled yet. Pressing Add with <code>PreserveIntensity</code> can still open it as a manual layer, and later intensity changes will not scale it until the manual ownership is removed. If intensity is high enough that the rule already owns the layer, PreserveIntensity keeps intensity in charge and lowering intensity can fade/disable it normally.')}
<h3>Drive it from code</h3>
${code(`// Fade a stem in on the next bar, then remove it later.
BST.AddLayer("Drums", quantize: true);
BST.RemoveLayer("Drums", quantize: true);

// Add without taking it away from the intensity system.
BST.AddLayer("Pads", quantize: true, addMode: BSTLayerAddMode.PreserveIntensity);

// Query and bulk control.
bool drumsOn = BST.IsLayerActive("Drums");
BST.AddLayers(new[] { "Bass", "Brass" });
BST.ClearLayers();`)}
<h3>Worked example - enemies nearby</h3>
${ex('When the first enemy appears, <code>BST.AddLayer("Drums")</code> thickens the mix on the next bar. When the area is clear, <code>BST.RemoveLayer("Drums")</code> thins it back out. The melody never stops; only the energy changes.')}
${ex('Example: Drums has <code>thresholdOn = 0.65</code>. At intensity <code>1.0</code>, Drums is intensity-controlled; <code>PreserveIntensity</code> Add will not steal it, and lowering intensity can turn it down/off. At intensity <code>0.0</code>, Drums is not intensity-controlled; <code>PreserveIntensity</code> Add can open it manually, so changing intensity later will not move its volume until you remove that manual layer.')}
${call('tip','Export stems together','For perfect sync, export every stem from the exact same start and end as the base track, at the same length and BPM. Keep <code>standbyVolume</code> near 0.00-0.01 so prepared stems stay silent until needed.')}
${call('note','Empty layer clips are advanced','Normally every layer should have a clip. An empty clip is only useful when a track-local layer definition intentionally shadows a shared conductor default layer by name.')}
<h3>Settings reference - layer fields</h3>
${settingRows(layerSettings, 'en')}
<h3>Settings reference - add modes</h3>
${settingRows([
 ['BSTLayerAddMode.ManualOverride','Manual layer changes take ownership from intensity.','Manuel layer değişimi intensity sahipliğini alır.','Use when gameplay explicitly wants a layer regardless of intensity.','Gameplay, intensityden bağımsız kesin bir layer istiyorsa kullan.'],
 ['BSTLayerAddMode.PreserveIntensity','Preserves intensity ownership only if the layer is already intensity-controlled.','Sadece layer zaten intensity-controlled ise intensity sahipliğini korur.','If the rule is inactive, Add can still become a manual layer.','Kural aktif değilse Add yine manuel layer olabilir.']
], 'en')}
<h3>Settings reference - default layer modes</h3>
${settingRows(defaultLayerModeRows, 'en')}`,
tr:`<p class="lead">Layerlar dikey aranjmandır. Aynı şarkıyı - davul gir, pad çık - track değiştirmeden daha ince ya da daha dolu yapar.</p>
<h3>Layerlar gerçekte nasıl çalar</h3>
<p>Bir layer, bir trackte tanımlı stem klibidir. Track başladığında ve <code>prepareMutedLayersOnTrackStart</code> açıkken, her stem neredeyse-sessiz <code>standbyVolume</code> seviyesinde birlikte başlar. Bir layerı açmak onu yeniden başlatmaz - sadece standby'dan <code>targetVolume</code>'e fade eder. Eklenen layerların müzikle her zaman tam senkron olmasının sebebi budur: zaten çalıyorlardı, sadece duyulmuyordu.</p>
<h3>Bir layerın sahibi kim</h3>
<p>Bir layer üç farklı sahip tarafından açılabilir; bunlar ayrı izlenir ve asla çatışmaz: senin manuel <code>AddLayer</code> çağrıların, intensity sistemi ve aktif bir bölge. <code>addMode</code>, manuel bir eklemenin intensity ile nasıl etkileşeceğini belirler. <code>ManualOverride</code> sahipliği alır; layer sen çıkarana dek kalır. <code>PreserveIntensity</code> sadece layer o anda zaten intensity tarafından kontrol ediliyorsa sahipliği korur; aksi durumda Add normal manuel add gibi davranabilir.</p>
${call('warn','PreserveIntensity anlık duruma bağlıdır','Intensity 0 ise veya layerın <code>thresholdOn</code> değerinin altındaysa, o layer çoğu zaman henüz intensity-controlled değildir. Bu durumda <code>PreserveIntensity</code> ile Add yapmak layerı manuel olarak açabilir ve manuel sahiplik kaldırılana kadar sonraki intensity değişimleri volumeünü ölçeklemez. Intensity yeterince yüksekse ve kural layerı zaten yönetiyorsa, PreserveIntensity intensityyi patron bırakır; intensity düşürülünce layer normal şekilde kısılıp kapanabilir.')}
<h3>Koddan sür</h3>
${code(`// Bir stemi sonraki barda fade ile ekle, sonra çıkar.
BST.AddLayer("Drums", quantize: true);
BST.RemoveLayer("Drums", quantize: true);

// Intensity sisteminden almadan ekle.
BST.AddLayer("Pads", quantize: true, addMode: BSTLayerAddMode.PreserveIntensity);

// Sorgula ve toplu kontrol et.
bool drumsOn = BST.IsLayerActive("Drums");
BST.AddLayers(new[] { "Bass", "Brass" });
BST.ClearLayers();`)}
<h3>Örnek - yakındaki düşmanlar</h3>
${ex('İlk düşman göründüğünde <code>BST.AddLayer("Drums")</code> sonraki barda miksi kalınlaştırır. Alan temizlenince <code>BST.RemoveLayer("Drums")</code> tekrar inceltir. Melodi hiç durmaz; sadece enerji değişir.')}
${ex('Örnek: Drums için <code>thresholdOn = 0.65</code>. Intensity <code>1.0</code> iken Drums intensity-controlled durumdadır; <code>PreserveIntensity</code> Add sahipliği çalmaz ve intensityyi düşürmek layerı kısıp kapatabilir. Intensity <code>0.0</code> iken Drums intensity-controlled değildir; <code>PreserveIntensity</code> Add layerı manuel açabilir, bu yüzden intensityyi sonra değiştirmek manuel sahiplik kaldırılana kadar volumeü oynatmaz.')}
${call('tip','Stemleri birlikte export et','Mükemmel senkron için her stemi base track ile aynı başlangıç ve bitişten, aynı uzunluk ve BPMde export et. Hazırlanan stemler gerekene dek sessiz kalsın diye <code>standbyVolume</code>’u 0.00-0.01 civarında tut.')}
${call('note','Boş layer clip ileri seviye kullanımdır','Normalde her layerın bir clipi olmalı. Boş clip yalnızca track-local layer tanımı aynı isimli shared conductor default layerı bilerek gölgelemek için kullanıldığında anlamlıdır.')}
<h3>Ayar referansı - layer alanları</h3>
${settingRows(layerSettings, 'tr')}
<h3>Ayar referansı - ekleme modları</h3>
${settingRows([
 ['BSTLayerAddMode.ManualOverride','Manual layer changes take ownership from intensity.','Manuel layer değişimi intensity sahipliğini alır.','Use when gameplay explicitly wants a layer regardless of intensity.','Gameplay, intensityden bağımsız kesin bir layer istiyorsa kullan.'],
 ['BSTLayerAddMode.PreserveIntensity','Preserves intensity ownership only if the layer is already intensity-controlled.','Sadece layer zaten intensity-controlled ise intensity sahipliğini korur.','If the rule is inactive, Add can still become a manual layer.','Kural aktif değilse Add yine manuel layer olabilir.']
], 'tr')}
<h3>Ayar referansı - default layer modları</h3>
${settingRows(defaultLayerModeRows, 'tr')}`},

'sections':{
en:`<p class="lead">Sections are horizontal form: intro, loop, bridge, outro, boss phase. They let a single track behave like a real interactive cue that travels based on what the player does.</p>
<h3>How sections work</h3>
<p>Turn on <code>useSections</code> and the track plays an ordered list of section blocks instead of one base clip. It starts at <code>entrySectionIndex</code>. When a section reaches a <b>valid exit</b>, the toolkit decides where to go next: it checks that section's <b>branches</b> in priority order, and the first branch whose conditions all pass wins. If no branch wins, it falls back to <code>defaultNextSection</code> (point this back at itself for a clean self-loop).</p>
<p>A valid exit is a musical door. By default a section can exit when it ends, but you can open extra doors mid-phrase with <code>useBarExitPoints</code> and <code>validExitBars</code> (1-based, so bar 5 means the start of the fifth bar), or mark the whole section as a transition point with <code>isTransitionPoint</code>. This is how the music only changes where it sounds natural.</p>
<h3>Branches and conditions</h3>
<p>A branch routes to a target section and can also toggle layers as it moves. Its <b>conditions</b> read live game state - the current state, intensity, active layers, track lock, custom flags, or how many times the section has looped. Empty conditions behave like <code>Always</code>, which makes a perfect final fallback branch.</p>
<p>Branches are sorted by descending <code>priority</code>. If two branches have the same priority, the profile list order wins. Put specific branches above broad fallback branches. A winning branch with <code>targetSectionIndex = -1</code> should be treated as advanced arrangement-only behavior: it may still add or remove layers, but it does not route to a new section.</p>
${call('note','Exit bars are gates, not commands','A valid exit bar does not jump by itself. It is a musical gate where a queued state change, zone transition or section jump is allowed to be consumed. If nothing is pending, the section keeps playing normally.')}
${call('note','Missed exits on loops','If a section jump is requested after the last authored exit bar in an infinite or still-allowed loop, the request waits for that exit bar on the next loop pass instead of getting trapped or cutting at an unauthored point.')}
${call('note','OnNextTransitionPoint fallback','For section-aware transitions, the toolkit checks valid bar exits first, then sections marked <code>isTransitionPoint</code>. If a track has no explicit transition points at all, normal section ends remain valid so the music never waits forever.')}
<h3>Valid exit bars in practice</h3>
<p><code>validExitBars</code> are 1-based local bars inside the current section. If a section is eight bars long and <code>validExitBars = [5]</code>, a pending transition may leave at the start of bar five. The player or gameplay can request a change earlier, but the music holds the request until that authored musical door opens. This matches how a composer thinks: do not leave in the middle of a phrase; leave at a cadence, pickup, fill, or downbeat that was written to accept a change.</p>
${settingRows([
 ['useBarExitPoints','Turns on authored mid-section exits.','Yazılmış section-içi çıkışları açar.','Use when a long loop has several musical doors before the end.','Uzun loop section sonundan önce birkaç müzikal kapı taşıyorsa kullan.'],
 ['validExitBars','Lists the 1-based local bars that are safe exits.','Güvenli çıkış olan 1 tabanlı lokal barları listeler.','Bar 5 means the beginning of this section’s fifth bar, not global song bar five.','Bar 5 global şarkı barı değil, bu sectionın beşinci bar başlangıcıdır.'],
 ['isTransitionPoint','Makes the whole section an acceptable transition target/exit point.','Tüm sectionı geçerli transition hedefi/çıkışı yapar.','Use for outro, riser, fill or cadence sections that exist to move somewhere else.','Outro, riser, fill veya kadans gibi başka yere gitmek için yazılan sectionlarda kullan.'],
 ['defaultNextSection','Fallback route when no branch wins.','Branch kazanmazsa fallback rota.','Set to self for loops, another index for authored flow, or -1 when the track should finish.','Loop için kendine, yazılmış akış için başka indexe, track bitsin istiyorsan -1 yap.']
], 'en')}
<h3>Branch authoring checklist</h3>
${settingRows([
 ['conditionType','Pick what the branch reads.','Branchin ne okuyacağını seçer.','State, intensity, active layers, custom flags and loop count each use different fields.','State, intensity, aktif layer, custom flag ve loop count farklı alanları kullanır.'],
 ['targetSectionIndex','Pick the musical destination.','Müzikal hedefi seçer.','-1 is arrangement-only and should be reserved for advanced layer-only branch moments.','-1 aranjman-only davranıştır; ileri layer-only branch anları için sakla.'],
 ['crossfadeToTarget / crossfadeDuration','Decide whether the target overlaps or cuts.','Hedefe overlap mı sert kesit mi yapılacağını seçer.','Use short fades for rhythmic hits, longer fades for pads or ambience.','Ritmik hitlerde kısa, pad/ambience için uzun fade kullan.'],
 ['addLayersOnBranch / removeLayersOnBranch','Change arrangement at the same musical door.','Aynı müzikal kapıda aranjmanı değiştirir.','Use to add brass on Phase2 or remove tension layers when calming down.','Phase2’de brass eklemek veya sakinleşirken tension layerlarını çıkarmak için kullan.']
], 'en')}
<h3>Drive it from code</h3>
${code(`// Set a flag your branch conditions can read.
BST.SetCustomFlag("BossPhase2", true);

// Or jump directly; this still respects valid exits when quantized.
BST.JumpToSectionByName("Phase2", quantize: true, crossfade: true);

// Inspect the live section state.
int index   = BST.GetCurrentSectionIndex();
string name = BST.GetCurrentSectionName();
int loops   = BST.GetSectionLoopCount();`)}
<h3>Worked example - a boss that escalates</h3>
${ex('A boss cue starts in <b>Intro</b> (plays once), moves to <b>Loop</b> (loops forever). A branch on Loop says: if custom flag <b>BossPhase2</b> is true, go to <b>Phase2</b> and add the <b>Brass</b> layer. When the boss dies you call <code>BST.JumpToSectionByName("Outro")</code>, and because Outro is a transition point the music leaves cleanly on the next musical door.')}
${call('warn','Always give a fallback','If a section can run out with no winning branch and <code>defaultNextSection</code> is -1, the track simply ends. Add an <code>Always</code> branch or self-loop default so the music stays in your control.')}
${call('tip','Valid exits are doors in a hallway','The player can ask to leave at any time, but the music only walks through a door that sounds natural. Author those doors deliberately with exit bars and transition points.')}
<h3>Settings reference - section fields</h3>
${settingRows(sectionSettings, 'en')}
<h3>Settings reference - branch fields</h3>
${settingRows(branchSettings, 'en')}
<h3>Settings reference - branch conditions</h3>
${settingRows(conditions, 'en')}
<h3>Settings reference - condition fields</h3>
${settingRows(conditionFieldRows, 'en')}`,
tr:`<p class="lead">Sectionlar yatay formdur: intro, loop, bridge, outro, boss phase. Tek bir trackin, oyuncunun yaptığına göre yol alan gerçek bir interaktif cue gibi davranmasını sağlar.</p>
<h3>Sectionlar nasıl çalışır</h3>
<p><code>useSections</code>'ı aç; track tek bir base clip yerine sıralı bir section bloğu listesi çalar. <code>entrySectionIndex</code>'ten başlar. Bir section bir <b>geçerli çıkışa</b> ulaştığında toolkit nereye gideceğine karar verir: o sectionın <b>branchlerini</b> priority sırasıyla kontrol eder ve tüm koşulları geçen ilk branch kazanır. Hiçbir branch kazanmazsa <code>defaultNextSection</code>'a düşer (temiz bir self-loop için bunu kendine geri göster).</p>
<p>Geçerli çıkış müzikal bir kapıdır. Varsayılan olarak bir section bittiğinde çıkabilir ama <code>useBarExitPoints</code> ve <code>validExitBars</code> ile (1 tabanlı; yani 5, beşinci barın başı demektir) cümle ortasında ek kapılar açabilir veya <code>isTransitionPoint</code> ile tüm sectionı transition point yapabilirsin. Müziğin sadece doğal duyulan yerde değişmesini bu sağlar.</p>
<h3>Branchler ve koşullar</h3>
<p>Bir branch bir hedef sectiona yönlendirir ve hareket ederken layer da açıp kapatabilir. <b>Koşulları</b> canlı oyun durumunu okur - mevcut state, intensity, aktif layerlar, track lock, custom flagler ya da sectionın kaç kez loop ettiği. Boş koşullar <code>Always</code> gibi davranır; bu da mükemmel bir son fallback branch yapar.</p>
<p>Branchler azalan <code>priority</code> sırasıyla değerlendirilir. İki branch aynı priority değerindeyse profildeki liste sırası kazanır. Özel branchleri geniş fallback branchlerden önce koy. Kazanan bir branchte <code>targetSectionIndex = -1</code> ileri seviye aranjman-only davranış olarak düşünülmeli: layer ekleyip çıkarabilir ama yeni sectiona yönlendirme yapmaz.</p>
${call('note','Exit bar kapıdır, komut değildir','Geçerli exit bar kendi başına atlama yapmaz. Sırada bekleyen state değişimi, zone geçişi veya section jump burada tüketilebilir. Bekleyen istek yoksa section normal şekilde çalmaya devam eder.')}
${call('note','OnNextTransitionPoint fallback','Section-aware geçişlerde toolkit önce geçerli bar exitlerini, sonra <code>isTransitionPoint</code> işaretli sectionları kontrol eder. Trackte hiç açık transition point yoksa normal section sonları geçerli kalır; böylece müzik sonsuza kadar beklemez.')}
${call('note','Loopta kacirilan exitler','Son yazilmis exit bardan sonra section jump istenirse ve section sonsuz ya da hala loop yapabiliyorsa, istek takilmaz ve yazilmamis bir noktada kesmez; sonraki loop turundaki ayni exit bari bekler.')}
<h3>Valid exit bars pratikte</h3>
<p><code>validExitBars</code>, mevcut section içindeki 1 tabanlı lokal barlardır. Section sekiz bar uzunluğundaysa ve <code>validExitBars = [5]</code> ise bekleyen geçiş beşinci barın başında çıkabilir. Oyuncu veya gameplay değişimi daha önce isteyebilir, ama müzik bu yazılmış kapı açılana kadar isteği tutar. Bu besteci mantığıdır: cümlenin ortasında çıkma; değişimi kabul edecek şekilde yazılmış kadans, pickup, fill veya downbeat noktasında çık.</p>
${settingRows([
 ['useBarExitPoints','Turns on authored mid-section exits.','Yazılmış section-içi çıkışları açar.','Use when a long loop has several musical doors before the end.','Uzun loop section sonundan önce birkaç müzikal kapı taşıyorsa kullan.'],
 ['validExitBars','Lists the 1-based local bars that are safe exits.','Güvenli çıkış olan 1 tabanlı lokal barları listeler.','Bar 5 means the beginning of this section’s fifth bar, not global song bar five.','Bar 5 global şarkı barı değil, bu sectionın beşinci bar başlangıcıdır.'],
 ['isTransitionPoint','Makes the whole section an acceptable transition target/exit point.','Tüm sectionı geçerli transition hedefi/çıkışı yapar.','Use for outro, riser, fill or cadence sections that exist to move somewhere else.','Outro, riser, fill veya kadans gibi başka yere gitmek için yazılan sectionlarda kullan.'],
 ['defaultNextSection','Fallback route when no branch wins.','Branch kazanmazsa fallback rota.','Set to self for loops, another index for authored flow, or -1 when the track should finish.','Loop için kendine, yazılmış akış için başka indexe, track bitsin istiyorsan -1 yap.']
], 'tr')}
<h3>Branch authoring kontrol listesi</h3>
${settingRows([
 ['conditionType','Pick what the branch reads.','Branchin ne okuyacağını seçer.','State, intensity, active layers, custom flags and loop count each use different fields.','State, intensity, aktif layer, custom flag ve loop count farklı alanları kullanır.'],
 ['targetSectionIndex','Pick the musical destination.','Müzikal hedefi seçer.','-1 is arrangement-only and should be reserved for advanced layer-only branch moments.','-1 aranjman-only davranıştır; ileri layer-only branch anları için sakla.'],
 ['crossfadeToTarget / crossfadeDuration','Decide whether the target overlaps or cuts.','Hedefe overlap mı sert kesit mi yapılacağını seçer.','Use short fades for rhythmic hits, longer fades for pads or ambience.','Ritmik hitlerde kısa, pad/ambience için uzun fade kullan.'],
 ['addLayersOnBranch / removeLayersOnBranch','Change arrangement at the same musical door.','Aynı müzikal kapıda aranjmanı değiştirir.','Use to add brass on Phase2 or remove tension layers when calming down.','Phase2’de brass eklemek veya sakinleşirken tension layerlarını çıkarmak için kullan.']
], 'tr')}
<h3>Koddan sür</h3>
${code(`// Branch koşullarının okuyabileceği bir flag ayarla.
BST.SetCustomFlag("BossPhase2", true);

// Ya da doğrudan atla; quantize edilince yine geçerli çıkışlara saygı gösterir.
BST.JumpToSectionByName("Phase2", quantize: true, crossfade: true);

// Canlı section durumunu incele.
int index   = BST.GetCurrentSectionIndex();
string name = BST.GetCurrentSectionName();
int loops   = BST.GetSectionLoopCount();`)}
<h3>Örnek - tırmanan bir boss</h3>
${ex('Bir boss cue <b>Intro</b> ile başlar (bir kez çalar), <b>Loop</b>a geçer (sonsuz loop). Loop’taki bir branch der ki: <b>BossPhase2</b> flagı true ise <b>Phase2</b>ye git ve <b>Brass</b> layerını ekle. Boss ölünce <code>BST.JumpToSectionByName("Outro")</code> çağırırsın ve Outro bir transition point olduğu için müzik bir sonraki müzikal kapıda temizce çıkar.')}
${call('warn','Her zaman bir fallback ver','Bir section kazanan branch olmadan biter ve <code>defaultNextSection</code> -1 ise track basitçe sona erer. Müzik kontrolünde kalsın diye bir <code>Always</code> branch veya self-loop varsayılanı ekle.')}
${call('tip','Geçerli çıkışlar koridordaki kapılardır','Oyuncu her an çıkmak isteyebilir ama müzik sadece doğal duyulan kapıdan çıkar. O kapıları exit bar ve transition point ile bilinçli tasarla.')}
<h3>Ayar referansı - section alanları</h3>
${settingRows(sectionSettings, 'tr')}
<h3>Ayar referansı - branch alanları</h3>
${settingRows(branchSettings, 'tr')}
<h3>Ayar referansı - branch koşulları</h3>
${settingRows(conditions, 'tr')}
<h3>Ayar referansı - condition alanları</h3>
${settingRows(conditionFieldRows, 'tr')}`},

'layers-in-sections':{
en:`<p class="lead">Sections are horizontal form and layers are vertical arrangement, and they are built to work together. A section track plays one block at a time while a shared pool of stem layers thickens or thins the mix on top. This page is the complete picture of how the two combine.</p>
${call('note','Layer and stem mean the same thing here','A <b>layer</b> is the named thing you turn on and off in BST: the track Layers list, Auto Enable Layers, <code>BST.AddLayer</code>. A <b>stem</b> is the audio clip that layer plays, the kind you bounce one instrument at a time from your DAW. This guide uses both words for the same object, one from the runtime side and one from the audio side.')}
<h3>Layers live on the track, not the section</h3>
<p>The one rule that explains everything else: stem layers are defined once, on the <b>track</b> (Track &gt; Layers), as a shared pool that every section of that track can use. A section never owns its own layer clips. Instead each section points at layers <b>by name</b> and chooses which of the track layers are audible while it plays, through <code>autoEnableLayers</code> and <code>autoDisableLayers</code>. The layer pool is the track palette; each section paints with a subset of it.</p>
<h3>How it plays across sections</h3>
<p>When the section track starts and <code>prepareMutedLayersOnTrackStart</code> is on, every stem in the track pool begins together, in sync, looping quietly at <code>standbyVolume</code>. They keep looping across every section boundary, locked to the bar grid, so any stem can fade in at any moment and still be in time. A section start runs its <code>autoEnableLayers</code> (fade those up) and <code>autoDisableLayers</code> (fade those down). Layers a section does not mention keep the state they already had, so to make a section play an <b>exact</b> set, list both the stems it opens and the stems it closes.</p>
<h3>What belongs in a base clip, and what belongs in a layer</h3>
<p>This one decision keeps a section track clean. Sort every part of your arrangement into one of two homes:</p>
<p><b>Music that always plays in a block goes in that section's own clip</b> (its <code>audioClip</code>). If a section always has its drums, chords and melody, bounce them into one finished section clip. It restarts cleanly at the section and you never touch it at runtime.</p>
<p><b>A part you switch on and off goes in a layer</b> (a continuous bar-aligned loop in the track pool). Use layers only for the few things you want to toggle with intensity, zones or gameplay: a combat drum loop, a tension string bed, a danger pad. They keep looping and you fade them in and out.</p>
${ex('Rule of thumb: "always on for this block" goes in the section clip; "sometimes on, driven by the game" goes in a layer. When in doubt, the section clip is the simpler home.')}
${call('warn','Do not over-fragment into layers','Splitting every instrument into its own per-section layer gets messy fast. A small set of toggleable global stems plus finished section clips is almost always easier to author, mix and debug than dozens of layers. Add more layers only when the game genuinely needs to control that part live.')}
<p>So the healthy shape of most section tracks is simple: <b>complete section clips for the music, plus a handful of global toggleable stems</b> shared across the sections as layers. Only when a toggleable stem's content actually differs from section to section do you reach for the track's Section Layers Exclusive option.</p>
${call('note','Sections and layers are not an either-or','Horizontal form (sections) and vertical arrangement (layers) are designed to combine, not to replace each other. Use sections to travel between musical blocks and layers to thicken or thin any block. A boss loop can branch to Phase 2 and add the Brass layer at the very same musical door.')}
<h3>Worked example - bridge with 4 layers, main loop with 6</h3>
<p>Say your Main Loop section should play 6 stems and your Bridge a different 4. You do not build two layer lists. You put every unique stem in the track Layers pool once, then let each section pick its subset:</p>
${ex('<b>Main Loop</b> section: Auto Enable the 6 main stems, Auto Disable the bridge-only stems.<br><b>Bridge</b> section: Auto Enable the 4 bridge stems, Auto Disable the main-only stems. At the boundary the stems both sections share keep playing untouched, the ones leaving fade out, and the ones arriving fade in, all on the bar.')}
<h3>Author stems as bar-aligned loops</h3>
<p>A layer on a section track is a <b>loop</b> that plays under the sections. It is not a one-shot and not a whole-song bounce. Export each stem at the track BPM as a clean loop (for example 2, 4 or 8 bars) that sounds right entered on any bar. Because the stems loop continuously and stay locked to the bar grid, a stem you only open in the Bridge keeps looping silently the rest of the time and is at the current bar position when the Bridge opens it, which is exactly what you want for drums, bass, pads and arps. Keep <code>standbyVolume</code> near 0.00-0.01 so unused stems stay silent.</p>
${call('warn','A layer is not the section clip','Each section already has its own <code>audioClip</code>, which is the main music of that block (horizontal). Layers are extra stems on top (vertical). Do not drop a whole song into a layer to fill a section. Give the section its own clip, and use layers only for the parts you want to add and remove.')}
${call('note','Stems stay continuous, they do not restart per section','The toolkit keeps every stem looping on the track grid rather than restarting it from its own bar one at each section. For loop-style stems this is perfect and always in time. If one specific stem must begin its own internal arc exactly at a section start, treat that idea as a section clip of its own or a branch crossfade, not as a layer.')}
<h3>Set it up in the editor</h3>
${settingRows([
 ['Track &gt; Layers','The shared stem pool for the whole track. Add every stem here with its clip.','Tüm trackin ortak stem havuzu. Her stemi klibiyle buraya ekle.','Define a stem once even if several sections use it.','Birden çok section kullansa bile stemi bir kez tanımla.'],
 ['Section &gt; autoEnableLayers','Layer names this section fades up when it starts.','Bu section başlayınca fade ile açtığı layer adları.','Type names that already exist in the track pool, exactly.','Track havuzunda zaten var olan isimleri birebir yaz.'],
 ['Section &gt; autoDisableLayers','Layer names this section fades down when it starts.','Bu section başlayınca fade ile kapattığı layer adları.','List these so a section lands on an exact arrangement.','Section tam bir aranjmana otursun diye bunları listele.'],
 ['Track &gt; defaultLayerMode','The starting arrangement when the track begins.','Track başlarken açık gelen aranjman.','MutedOnly, AllAvailable, CustomList or InheritFromPrevious.','MutedOnly, AllAvailable, CustomList veya InheritFromPrevious.'],
 ['prepareMutedLayersOnTrackStart','Schedules the stems in sync so they can be enabled at any time.','Stemleri senkron schedule eder; her an açılabilsinler.','Keep on for section-track layers; this is the sync-safe path.','Section-track layerları için açık tut; senkron için güvenli yol.'],
 ['Track &gt; Section Layers Exclusive','Each section plays exactly its Auto Enable Layers; the previous section stems turn off automatically.','Her section tam olarak kendi Auto Enable Layers listesini çalar; önceki section stemleri otomatik kapanır.','Skips zone, intensity and gameplay layers, so you avoid hand-written Auto Disable lists. Section tracks only.','Zone, intensity ve gameplay layerlarını atlar; elle Auto Disable listesi yazmaktan kurtarır. Sadece section trackleri.']
], 'en')}
<h3>Turning layers off and driving intensity mid-section</h3>
<p>Every way of controlling layers works on the same always-looping pool, so all of them are available at any point inside a section, and turning a layer off only fades its stem back down to <code>standbyVolume</code> while the source keeps looping silently, ready to return in sync. Five owners can change layers, tracked separately so they never fight: your manual <code>BST.AddLayer</code> / <code>BST.RemoveLayer</code> calls (quantized to the bar), the section through <code>autoEnableLayers</code> and <code>autoDisableLayers</code>, a branch through <code>addLayersOnBranch</code> and <code>removeLayersOnBranch</code> at a valid exit, a zone through its Layer Rules, and the intensity system through its threshold rules.</p>
<p>Intensity is the one to understand here, because it runs continuously and ignores section boundaries. You set a single 0-1 number with <code>BST.SetIntensity</code>; an Intensity Profile maps it to layers (each rule names a layer and a <code>thresholdOn</code>), and the Conductor fades the matching stems in and out, quantized to the bar, no matter which section is playing. So a tension stem can swell with danger across the Intro, Loop and Bridge alike, because it is just another stem in the shared pool. A track can opt into its own rules with <code>intensityOverrideMode</code>.</p>
${call('warn','One owner per stem at a time','A manual add with <code>ManualOverride</code> takes a layer away from intensity until you remove it; <code>PreserveIntensity</code> leaves intensity in charge only when the rule already owns the layer. Decide who owns each stem in a given moment so a section, a zone and intensity are not fighting over the same one.')}
${code(`// All of these work in the middle of a section, on the bar.
BST.RemoveLayer("Drums", quantize: true);   // fade a stem back to standby
BST.AddLayer("Choir", quantize: true);       // bring another stem in
BST.SetIntensity(0.8f);                       // let intensity drive its own layers`)}
<h3>Exclusive section layers: each section plays only its own stems</h3>
<p>By default sections are additive: a section turns on its <code>autoEnableLayers</code> and turns off its <code>autoDisableLayers</code>, and anything else keeps playing. So a stem a previous section opened keeps going until some section explicitly closes it. For a few stems that is fine, but with many per-section stems you end up hand-writing long Auto Disable lists.</p>
<p>Turn on the track's <b>Section Layers Exclusive</b> to make each section play <b>exactly</b> its own <code>autoEnableLayers</code>. When a section starts, any stem the previous section enabled that this section does not re-enable is turned off for you. You only ever fill Auto Enable Layers; the engine handles the turning-off.</p>
${ex('One track, sections below. Exclusive is on and no Auto Disable lists are filled.<br><b>Verse</b>: Auto Enable [VerseKeys, VerseBass]<br><b>Chorus</b>: Auto Enable [ChorusSynth, ChorusBass, ChorusLead]<br><b>Breakdown</b>: Auto Enable [] (empty)<br>Verse to Chorus turns VerseKeys and VerseBass off and brings the three chorus stems in. Chorus to Breakdown turns all of them off, so Breakdown is bare with no hand-written disables.')}
${call('note','It only manages section stems','Exclusive mode touches only the stems sections turn on. A layer a zone forces, an intensity rule drives, or gameplay adds with <code>BST.AddLayer</code> is left alone across section changes, because those have their own owners. So a global combat stem you add from code keeps playing through Verse, Chorus and Breakdown until you remove it.')}
${code(`// A gameplay layer survives section changes even with exclusive mode on.
BST.AddLayer("CombatPerc");    // stays on across every section
// ... later ...
BST.RemoveLayer("CombatPerc"); // you decide when it stops, not the sections`)}
${call('tip','When to use it','Reach for Exclusive only when stems differ from section to section and you want clean per-section sets. If your track is just a few global toggleable stems, leave it off and let them carry across sections.')}
<h3>Layers from a zone on a section track</h3>
<p>A Music Zone can force extra layers on top while the player is inside it. The zone Layer Rules name layers using the <b>same names</b> that exist in the active track pool, with optional state, track index or track name filters so a rule only applies on the right track. The zone stacks its layers over whatever the section already enabled. If a rule names a layer the active track does not define, you get a "not prepared" warning, because that stem has no source on this track.</p>
${code(`// Layers behave the same from code while a section track plays.
BST.AddLayer("Brass", quantize: true);   // fades up on the next bar, in sync
BST.RemoveLayer("Brass", quantize: true);
bool on = BST.IsLayerActive("Brass");`)}
${call('warn','The three most common mistakes','1) Listing only autoEnableLayers and forgetting autoDisableLayers, so a previous section stems keep playing. 2) Using a full-song clip as a layer instead of a bar-aligned loop. 3) A layer name that does not match the track pool exactly. Each of these shows up as silence or a "not prepared" log line.')}
<h3>Settings reference - layer fields</h3>
${settingRows(layerSettings, 'en')}`,
tr:`<p class="lead">Section'lar yatay form, layer'lar dikey aranjmandır ve birlikte çalışmak için tasarlanmıştır. Section'lı track aynı anda tek bir blok çalar; üstünde ortak bir stem layer havuzu miksi kalınlaştırır veya inceltir. Bu sayfa ikisinin nasıl birleştiğinin tam resmidir.</p>
${call('note','Burada layer ve stem aynı şey','<b>layer</b>, BST içinde açıp kapattığın isimli şeydir: track Layers listesi, Auto Enable Layers, <code>BST.AddLayer</code>. <b>stem</b> ise o layerın çaldığı ses klibidir, DAW içinde enstrüman başına aldığın tür. Bu rehber ikisini de aynı nesne için kullanır: biri runtime tarafından, biri ses tarafından.')}
<h3>Layer'lar section'a değil, track'e ait</h3>
<p>Gerisini açıklayan tek kural: stem layer'lar bir kez, <b>track</b> üzerinde (Track &gt; Layers) tanımlanır ve o track'in tüm section'larının kullanabileceği ortak bir havuzdur. Bir section asla kendi layer klibine sahip olmaz. Bunun yerine her section layer'lara <b>isimle</b> işaret eder ve <code>autoEnableLayers</code> ile <code>autoDisableLayers</code> üzerinden, çalarken track'in hangi layer'larının duyulacağını seçer. Layer havuzu track'in paletidir; her section onun bir alt kümesiyle boyar.</p>
<h3>Section'lar boyunca nasıl çalar</h3>
<p>Section'lı track başladığında ve <code>prepareMutedLayersOnTrackStart</code> açıkken, havuzdaki her stem birlikte, senkron, <code>standbyVolume</code> seviyesinde sessizce loop'layarak başlar. Her section sınırında bar grid'ine kilitli loop'lamaya devam ederler; böylece herhangi bir stem her an fade ile açılıp yine zamanında olur. Bir section başında <code>autoEnableLayers</code> (onları aç) ve <code>autoDisableLayers</code> (onları kapat) çalışır. Section'ın anmadığı layer'lar mevcut durumunu korur; bu yüzden bir section'ın <b>tam</b> bir set çalması için hem açtıklarını hem kapattıklarını listele.</p>
<h3>Ne base clip'e, ne layer'a gider</h3>
<p>Section'lı track'i temiz tutan tek karar budur. Aranjmanının her parçasını iki yerden birine ayır:</p>
<p><b>Bir blokta her zaman çalan müzik, o section'ın kendi clip'ine gider</b> (<code>audioClip</code>). Bir section'da davul, akor ve melodi hep çalıyorsa, onları tek bir bitmiş section clip'ine bounce et. Section'da temiz başlar, çalışma anında ona hiç dokunmazsın.</p>
<p><b>Aç/kapat ettiğin parça layer'a gider</b> (track havuzunda sürekli, bar'a hizalı bir loop). Layer'ı yalnızca intensity, zone veya gameplay ile toggle'lamak istediğin birkaç şey için kullan: combat davul loop'u, tension yaylı yatağı, tehlike pad'i. Bunlar loop'lamaya devam eder, sen fade ile açıp kaparsın.</p>
${ex('Pratik kural: "bu blokta hep açık" ise section clip; "bazen açık, oyun sürüyor" ise layer. Kararsızsan section clip daha basit ev.')}
${call('warn','Layerlara aşırı bölme','Her enstrümanı section başına ayrı bir layer yapmak hızla dağılır. Az sayıda toggle edilebilir global stem artı bitmiş section klipleri, onlarca layerdan neredeyse her zaman daha kolay yazılır, mikslenir ve debug edilir. Daha fazla layeri yalnızca oyun o parçayı gerçekten canlı kontrol etmesi gerektiğinde ekle.')}
<p>Yani çoğu section'lı track'in sağlıklı şekli basittir: <b>müzik için bitmiş section clip'leri, artı section'lar arası paylaşılan birkaç global toggle stem'i</b> layer olarak. Ancak toggle edilen bir stem'in içeriği section'dan section'a gerçekten değişiyorsa track'in Section Layers Exclusive seçeneğine uzanırsın.</p>
${call('note','Section ile layer ya o ya bu değildir','Yatay form (section) ve dikey aranjman (layer) birbirinin yerine değil, birlikte çalışmak için tasarlandı. Müzikal bloklar arasında gezmek için section, bir bloğu kalınlaştırıp inceltmek için layer kullan. Bir boss loopu aynı müzikal kapıda hem Phase 2ye dallanıp hem Brass layerini ekleyebilir.')}
<h3>Örnek - 4 layer'lı bridge, 6 layer'lı main loop</h3>
<p>Diyelim Main Loop section'ın 6 stem, Bridge bunlardan farklı 4 stem çalsın. İki ayrı layer listesi kurmazsın. Her benzersiz stem'i track'in Layers havuzuna bir kez koyar, sonra her section alt kümesini seçer:</p>
${ex('<b>Main Loop</b> section: 6 main stem Auto Enable, sadece-bridge stemleri Auto Disable.<br><b>Bridge</b> section: 4 bridge stem Auto Enable, sadece-main stemleri Auto Disable. Sınırda iki sectionda ortak olan stemler kesintisiz çalmaya devam eder, gidenler fade-out, gelenler fade-in olur, hepsi bar üstünde.')}
<h3>Stem'leri bar'a hizalı loop olarak hazırla</h3>
<p>Section'lı track'te bir layer, section'ların altında çalan bir <b>loop</b>'tur. Tek seferlik bir ses ya da full-şarkı bounce değildir. Her stem'i track BPM'inde, her bar'da girildiğinde doğru duyulan temiz bir loop olarak (örneğin 2, 4 veya 8 bar) export et. Stem'ler sürekli loop'layıp bar grid'ine kilitli kaldığı için, sadece Bridge'de açtığın bir stem geri kalan zamanda sessizce loop'lamaya devam eder ve Bridge onu açtığında o anki bar pozisyonundadır; davul, bas, pad ve arp için tam istediğin budur. Kullanılmayan stem'ler sessiz kalsın diye <code>standbyVolume</code> değerini 0.00-0.01 civarında tut.</p>
${call('warn','Layer, section klibi değildir','Her sectionun zaten kendi <code>audioClip</code> değeri var; o, bloğun ana müziğidir (yatay). Layerlar üstteki ek stemlerdir (dikey). Bir sectionu doldurmak için full şarkıyı layera koyma. Sectiona kendi klibini ver, layerları yalnızca açıp kapatmak istediğin parçalar için kullan.')}
${call('note','Stemler süreklidir, section başına restart olmaz','Toolkit her stemi track gridi üzerinde looplatır; her sectionda kendi bar birinden yeniden başlatmaz. Loop tarzı stemler için bu mükemmel ve her zaman zamanındadır. Belirli bir stemin kendi iç yapısını tam bir section başında başlatması şartsa, o fikri bir layer değil, sectionun kendi klibi veya bir branch crossfadei olarak ele al.')}
<h3>Editörde nasıl kurulur</h3>
${settingRows([
 ['Track &gt; Layers','The shared stem pool for the whole track. Add every stem here with its clip.','Tüm trackin ortak stem havuzu. Her stemi klibiyle buraya ekle.','Define a stem once even if several sections use it.','Birden çok section kullansa bile stemi bir kez tanımla.'],
 ['Section &gt; autoEnableLayers','Layer names this section fades up when it starts.','Bu section başlayınca fade ile açtığı layer adları.','Type names that already exist in the track pool, exactly.','Track havuzunda zaten var olan isimleri birebir yaz.'],
 ['Section &gt; autoDisableLayers','Layer names this section fades down when it starts.','Bu section başlayınca fade ile kapattığı layer adları.','List these so a section lands on an exact arrangement.','Section tam bir aranjmana otursun diye bunları listele.'],
 ['Track &gt; defaultLayerMode','The starting arrangement when the track begins.','Track başlarken açık gelen aranjman.','MutedOnly, AllAvailable, CustomList or InheritFromPrevious.','MutedOnly, AllAvailable, CustomList veya InheritFromPrevious.'],
 ['prepareMutedLayersOnTrackStart','Schedules the stems in sync so they can be enabled at any time.','Stemleri senkron schedule eder; her an açılabilsinler.','Keep on for section-track layers; this is the sync-safe path.','Section-track layerları için açık tut; senkron için güvenli yol.'],
 ['Track &gt; Section Layers Exclusive','Each section plays exactly its Auto Enable Layers; the previous section stems turn off automatically.','Her section tam olarak kendi Auto Enable Layers listesini çalar; önceki section stemleri otomatik kapanır.','Skips zone, intensity and gameplay layers, so you avoid hand-written Auto Disable lists. Section tracks only.','Zone, intensity ve gameplay layerlarını atlar; elle Auto Disable listesi yazmaktan kurtarır. Sadece section trackleri.']
], 'tr')}
<h3>Section çalarken layer kapatma ve intensity kontrolü</h3>
<p>Her layer kontrolü aynı sürekli loop'layan havuz üzerinde çalışır; bu yüzden hepsi section'ın herhangi bir anında kullanılabilir ve bir layer'ı kapatmak sadece stem'i <code>standbyVolume</code> seviyesine geri fade eder, source sessizce loop'lamaya devam eder ve senkron şekilde geri dönmeye hazırdır. Layer'ları beş sahip değiştirebilir; ayrı izlenir ve çatışmazlar: manuel <code>BST.AddLayer</code> / <code>BST.RemoveLayer</code> çağrıların (bar'a quantize), section'ın <code>autoEnableLayers</code> ve <code>autoDisableLayers</code> ile, bir branch'in geçerli çıkışta <code>addLayersOnBranch</code> ve <code>removeLayersOnBranch</code> ile, bir bölgenin Layer Rules ile ve intensity sisteminin eşik kurallarıyla.</p>
<p>Burada anlaşılması gereken intensity'dir, çünkü sürekli çalışır ve section sınırlarını yok sayar. <code>BST.SetIntensity</code> ile tek bir 0-1 değeri verirsin; bir Intensity Profile bunu layer'lara eşler (her kural bir layer ve bir <code>thresholdOn</code> adlandırır) ve Conductor eşleşen stem'leri bar'a quantize ederek fade-in/out yapar, hangi section çalıyorsa çalsın. Böylece bir tension stem'i tehlikeyle birlikte Intro, Loop ve Bridge boyunca aynı şekilde kabarabilir, çünkü o da paylaşılan havuzdaki bir stem'dir. Bir track <code>intensityOverrideMode</code> ile kendi kurallarını kullanabilir.</p>
${call('warn','Bir anda her stem için tek sahip','ManualOverride ile manuel ekleme, sen kaldırana kadar layeri intensityden alır; PreserveIntensity ise sadece kural layeri zaten yönetiyorsa intensityyi patron bırakır. Her stemin o anki sahibine karar ver ki bir section, bir bölge ve intensity aynı stem için çekişmesin.')}
${code(`// Bunların hepsi section ortasında, bar üzerinde çalışır.
BST.RemoveLayer("Drums", quantize: true);   // stemi standby seviyesine fade et
BST.AddLayer("Choir", quantize: true);       // başka bir stem getir
BST.SetIntensity(0.8f);                       // intensity kendi layerlarını sürsün`)}
<h3>Exclusive section layer: her section sadece kendi stem'lerini çalar</h3>
<p>Varsayılan olarak section'lar ekleyicidir: bir section kendi <code>autoEnableLayers</code>'ını açar, <code>autoDisableLayers</code>'ını kapatır, gerisi çalmaya devam eder. Yani önceki section'ın açtığı bir stem, bir section onu açıkça kapatana kadar çalar. Az stem'le sorun değil, ama section başına çok stem varsa uzun Auto Disable listeleri yazmak zorunda kalırsın.</p>
<p>Track'in <b>Section Layers Exclusive</b> ayarını açınca her section <b>tam olarak</b> kendi <code>autoEnableLayers</code>'ını çalar. Bir section başladığında, önceki section'ın açtığı ama bunun açmadığı her stem senin yerine kapatılır. Sadece Auto Enable Layers doldurursun; kapatmayı motor halleder.</p>
${ex('Tek track, altında sectionlar. Exclusive açık ve hiçbir Auto Disable listesi dolu değil.<br><b>Verse</b>: Auto Enable [VerseKeys, VerseBass]<br><b>Chorus</b>: Auto Enable [ChorusSynth, ChorusBass, ChorusLead]<br><b>Breakdown</b>: Auto Enable [] (boş)<br>Verse-Chorus geçişinde VerseKeys ve VerseBass kapanır, üç chorus stemi girer. Chorus-Breakdown geçişinde hepsi kapanır, Breakdown çıplak kalır, elle disable yazmadan.')}
${call('note','Yalnızca section stemlerini yönetir','Exclusive mode sadece sectionların açtığı stemlere dokunur. Bir zonenin zorladığı, bir intensity kuralının sürdüğü ya da gameplayin <code>BST.AddLayer</code> ile eklediği layer, section değişimlerinde rahat bırakılır, çünkü onların kendi sahipleri var. Yani koddan eklediğin global bir combat stemi Verse, Chorus ve Breakdown boyunca, sen kaldırana kadar çalar.')}
${code(`// Gameplay layer'ı exclusive açıkken bile section geçişlerinde hayatta kalır.
BST.AddLayer("CombatPerc");    // her section boyunca açık kalır
// ... sonra ...
BST.RemoveLayer("CombatPerc"); // ne zaman duracağına section değil sen karar verirsin`)}
${call('tip','Ne zaman kullanmalı','Exclusive ayarını yalnızca stemler sectiondan sectiona değişiyorsa ve temiz per-section setler istiyorsan aç. Track birkaç global toggle stemden ibaretse kapalı bırak, section boyunca taşınsınlar.')}
<h3>Section'lı track'te zone layer'ları</h3>
<p>Bir Müzik Bölgesi, oyuncu içindeyken üstüne ekstra layer zorlayabilir. Bölgenin Layer Rules alanı layer'ları aktif track'in havuzunda var olan <b>aynı isimlerle</b> adlandırır; opsiyonel state, track index veya track adı filtreleriyle bir kural yalnızca doğru track'te uygulanır. Bölge kendi layer'larını section'ın zaten açtıklarının üstüne yığar. Bir kural aktif track'in tanımlamadığı bir layer'ı adlandırırsa, o stem'in bu track'te kaynağı olmadığı için "not prepared" uyarısı alırsın.</p>
${code(`// Section'lı track çalarken layer'lar koddan da aynı davranır.
BST.AddLayer("Brass", quantize: true);   // sonraki barda senkron fade-in
BST.RemoveLayer("Brass", quantize: true);
bool on = BST.IsLayerActive("Brass");`)}
${call('warn','En sık üç hata','1) Sadece autoEnableLayers yazıp autoDisableLayers unutmak; önceki sectionun stemleri çalmaya devam eder. 2) Bar\'a hizalı loop yerine full-şarkı klibini layer olarak kullanmak. 3) Track havuzuyla birebir eşleşmemiş bir layer adı. Her biri sessizlik ya da "not prepared" log satırı olarak görünür.')}
<h3>Ayar referansı - layer alanları</h3>
${settingRows(layerSettings, 'tr')}`},

'intensity':{
en:`<p class="lead">Intensity is one 0-1 pressure value. It is the cleanest tool when danger grows gradually instead of switching as a hard state.</p>
<h3>How intensity works</h3>
<p>You set a single number with <code>BST.SetIntensity</code>. An Intensity Profile maps that number to layer behavior: each rule names a layer and a threshold at which it turns on. The Conductor then fades the matching layers in and out for you, quantized to the bar so the energy lands musically.</p>
<p>Rules use <b>hysteresis</b>: a layer turns on at <code>thresholdOn</code> and off at the lower <code>thresholdOff</code>. That gap stops a layer from flickering when the value hovers near a single point. For a smoother result you can give a rule a <code>volumeScalarCurve</code> so the layer swells continuously with intensity instead of snapping on and off.</p>
${call('note','Exact edge rules','A threshold layer turns on when intensity is greater than or equal to <code>thresholdOn</code>. Once it is active, it stays active while intensity is greater than the effective off threshold. The off threshold is clamped so it cannot sit above the on threshold.')}
${call('note','Curves still respect standby sync','A <code>volumeScalarCurve</code> scales the layer target volume, but the result is clamped and floored at <code>standbyVolume</code>. That keeps prepared stems sync-ready instead of stopping and restarting them.')}
<h3>Where the rules come from</h3>
<p>A track's <code>intensityOverrideMode</code> chooses the source: the conductor's shared profile, a profile override on the track, or custom rules authored directly on the track. Zones can also override the intensity profile while the player is inside an area.</p>
${settingRows([
 ['UseConductorDefault','Track reads the Conductor activeIntensityProfile.','Track Conductor activeIntensityProfile değerini okur.','Best when the whole score shares one energy language.','Bütün skor aynı enerji dilini paylaşıyorsa en iyi seçim.'],
 ['UseProfileOverride','Track reads its trackIntensityProfile.','Track kendi trackIntensityProfile değerini okur.','Use when several tracks share a special rule set.','Birkaç track özel bir kural seti paylaşıyorsa kullan.'],
 ['UseCustomRules','Track reads customIntensityRules on the track.','Track üzerindeki customIntensityRules değerlerini okur.','Use when the rule belongs only to this track.','Kural sadece bu tracke aitse kullan.'],
 ['Zone override','Active top zone can provide zoneIntensityProfile.','Aktif üst zone zoneIntensityProfile sağlayabilir.','Use when a place should remap the same intensity value.','Bir mekan aynı intensity değerini farklı yorumlamalıysa kullan.']
], 'en')}
<h3>Drive it from code</h3>
${code(`// Map a gameplay value (closer enemy = more pressure) to 0..1.
float danger = Mathf.InverseLerp(30f, 5f, nearestEnemyDistance);
BST.SetIntensity(danger, quantize: true, smooth: true, smoothSpeed: 2.5f);

// Read it back if UI or other systems need it.
float current = BST.GetIntensity();`)}
${ex('Set <code>thresholdOn = 0.65</code> for Drums and <code>thresholdOff = 0.45</code>. As enemies close in, intensity passes 0.65 and drums fade in; as you escape and it drops below 0.45 they fade out. Between those values nothing flickers.')}
${call('tip','Intensity vs states','Use a state change for a clear mode switch (Explore to Combat). Use intensity for a smooth dial within a mode (how dangerous combat currently feels). They work beautifully together.')}
<h3>Quantize and smooth</h3>
<p><code>quantize</code> controls when layer changes are allowed to land. <code>smooth</code> controls how the numeric value moves toward the target over time. <code>layerFadeOverride</code> controls the audible fade used when intensity changes layer volumes. They are independent: you can smooth the danger value while still waiting for the next bar before stems change, or turn quantize and layer fade off for truly instant UI-like reactions.</p>
${settingRows([
 ['quantize: true','Layer enables/disables wait for the musical boundary.','Layer açma/kapama müzikal sınırı bekler.','Use for normal gameplay music.','Normal gameplay müziğinde kullan.'],
 ['smooth: true','Intensity value glides toward the target.','Intensity değeri hedefe doğru kayar.','Use for pressure, suspicion and crowd tension.','Baskı, şüphe ve kalabalık gerilimi için kullan.'],
 ['smoothSpeed','How quickly smooth intensity follows.','Smooth intensity ne kadar hızlı takip eder.','Higher is responsive; lower is more musical.','Yüksek tepki verir; düşük daha müzikal akar.'],
 ['BSTSmoothEasing','Shape of the smoothing curve.','Smoothing eğrisinin şekli.','Use EaseInOut for natural movement.','Doğal hareket için EaseInOut kullan.'],
 ['layerFadeOverride','Fade used when intensity changes layer volume.','Intensity layer volume değiştirdiğinde kullanılan fade.','-1 inherits conductor/layer fades; 0 makes audible response instant.','-1 conductor/layer fade miras alır; 0 duyulan tepkiyi anlık yapar.']
], 'en')}
<h3>Settings reference - intensity rule fields</h3>
${settingRows(intensitySettings, 'en')}`,
tr:`<p class="lead">Intensity, 0-1 arası tek bir baskı değeridir. Tehlike sert bir state değişimi yerine kademeli büyüyorsa en temiz araçtır.</p>
<h3>Intensity nasıl çalışır</h3>
<p><code>BST.SetIntensity</code> ile tek bir sayı ayarlarsın. Bir Intensity Profili bu sayıyı layer davranışına çevirir: her kural bir layerı ve açılacağı bir eşiği adlandırır. Conductor da eşleşen layerları senin için fade ile açıp kapatır, enerji müzikal yere otursun diye bara quantize eder.</p>
<p>Kurallar <b>histerezis</b> kullanır: bir layer <code>thresholdOn</code>'da açılır, daha düşük <code>thresholdOff</code>'ta kapanır. Bu boşluk, değer tek bir nokta etrafında gezerken layerın titremesini önler. Daha yumuşak sonuç için bir kurala <code>volumeScalarCurve</code> verebilirsin; böylece layer aç/kapa yerine intensity ile kademeli yükselir.</p>
${call('note','Net eşik kuralları','Threshold layer, intensity <code>thresholdOn</code> değerine eşit veya büyük olunca açılır. Aktif olduktan sonra intensity effective off threshold değerinden büyük kaldığı sürece açık kalır. Off threshold, on threshold üstüne çıkamayacak şekilde sınırlandırılır.')}
${call('note','Curve yine standby sync korur','<code>volumeScalarCurve</code> layer target volume değerini ölçekler, ama sonuç clamp edilir ve <code>standbyVolume</code> altına düşürülmez. Böylece hazırlanmış stemler durup yeniden başlamaz, sync-ready kalır.')}
<h3>Kurallar nereden gelir</h3>
<p>Bir trackin <code>intensityOverrideMode</code>'u kaynağı seçer: conductorun ortak profili, trackteki bir profil override'ı ya da doğrudan trackte yazılmış özel kurallar. Bölgeler de oyuncu bir alandayken intensity profilini override edebilir.</p>
${settingRows([
 ['UseConductorDefault','Track reads the Conductor activeIntensityProfile.','Track Conductor activeIntensityProfile değerini okur.','Best when the whole score shares one energy language.','Bütün skor aynı enerji dilini paylaşıyorsa en iyi seçim.'],
 ['UseProfileOverride','Track reads its trackIntensityProfile.','Track kendi trackIntensityProfile değerini okur.','Use when several tracks share a special rule set.','Birkaç track özel bir kural seti paylaşıyorsa kullan.'],
 ['UseCustomRules','Track reads customIntensityRules on the track.','Track üzerindeki customIntensityRules değerlerini okur.','Use when the rule belongs only to this track.','Kural sadece bu tracke aitse kullan.'],
 ['Zone override','Active top zone can provide zoneIntensityProfile.','Aktif üst zone zoneIntensityProfile sağlayabilir.','Use when a place should remap the same intensity value.','Bir mekan aynı intensity değerini farklı yorumlamalıysa kullan.']
], 'tr')}
<h3>Koddan sür</h3>
${code(`// Bir gameplay değerini (yakın düşman = daha çok baskı) 0..1'e çevir.
float danger = Mathf.InverseLerp(30f, 5f, nearestEnemyDistance);
BST.SetIntensity(danger, quantize: true, smooth: true, smoothSpeed: 2.5f);

// UI veya başka sistemler isterse geri oku.
float current = BST.GetIntensity();`)}
${ex('Drums için <code>thresholdOn = 0.65</code> ve <code>thresholdOff = 0.45</code> ayarla. Düşmanlar yaklaştıkça intensity 0.65’i geçer ve davul fade ile girer; kaçıp 0.45’in altına düşünce fade ile çıkar. Bu iki değer arasında hiçbir şey titremez.')}
${call('tip','Intensity vs state','Net bir mod değişimi için state değişimi kullan (Explore’dan Combata). Bir mod içindeki yumuşak kadran için intensity kullan (combat şu an ne kadar tehlikeli hissediyor). İkisi birlikte harika çalışır.')}
<h3>Quantize ve smooth</h3>
<p><code>quantize</code>, layer değişimlerinin ne zaman oturabileceğini belirler. <code>smooth</code>, sayısal değerin hedefe zamanla nasıl yaklaşacağını belirler. <code>layerFadeOverride</code> ise intensity layer volumelerini değiştirirken duyulan fade süresini kontrol eder. Bunlar bağımsızdır: danger değerini smooth edip stem değişimini yine sonraki bara bekletebilir veya UI benzeri gerçekten anlık tepki için quantize ve layer fade'i kapatabilirsin.</p>
${settingRows([
 ['quantize: true','Layer enables/disables wait for the musical boundary.','Layer açma/kapama müzikal sınırı bekler.','Use for normal gameplay music.','Normal gameplay müziğinde kullan.'],
 ['smooth: true','Intensity value glides toward the target.','Intensity değeri hedefe doğru kayar.','Use for pressure, suspicion and crowd tension.','Baskı, şüphe ve kalabalık gerilimi için kullan.'],
 ['smoothSpeed','How quickly smooth intensity follows.','Smooth intensity ne kadar hızlı takip eder.','Higher is responsive; lower is more musical.','Yüksek tepki verir; düşük daha müzikal akar.'],
 ['BSTSmoothEasing','Shape of the smoothing curve.','Smoothing eğrisinin şekli.','Use EaseInOut for natural movement.','Doğal hareket için EaseInOut kullan.'],
 ['layerFadeOverride','Fade used when intensity changes layer volume.','Intensity layer volume değiştirdiğinde kullanılan fade.','-1 inherits conductor/layer fades; 0 makes audible response instant.','-1 conductor/layer fade miras alır; 0 duyulan tepkiyi anlık yapar.']
], 'tr')}
<h3>Ayar referansı - intensity kural alanları</h3>
${settingRows(intensitySettings, 'tr')}`},

'zones':{
en:`<p class="lead">Music Zones are scene-authored musical intent. A place in the world can temporarily change the music - no gameplay code required.</p>
<h3>How zones work</h3>
<p>A Music Zone is a trigger volume. When a tagged collider enters, the zone becomes active and can request a state, override the whole profile, force layers, override the intensity profile, or lock the current track. When the collider leaves, the zone deactivates and the toolkit resolves the best remaining source - a still-active request, your global music state, or silence - while restoring manually forced layers and intensity.</p>
<p>Multiple overlapping zones form a stack. The <b>top zone</b> wins, decided by <code>zonePriority</code> first and most-recently-entered second. So a small intense room placed inside a large calm region just needs a higher priority to take over while you are inside it. A short <code>zoneDebounceTime</code> prevents flicker when you stand right on a trigger edge.</p>
<p><code>zoneTransitionMode</code> controls when the zone state may land. <code>OnNextTransitionPoint</code> first waits for authored <code>validExitBars</code>, then sections marked <code>isTransitionPoint</code>, and finally a safe section-end fallback when the track has no later authored door. If that fallback is used with a fade, the bed is pre-rolled before the section ends so the exit can crossfade instead of cutting hard.</p>
<h3>Set it up in the editor</h3>
<ol class="steps">
<li><b>Create the zone.</b> <code>GameObject > BeatSync Toolkit > BST Music Zone</code>. It comes with a trigger BoxCollider and a translucent preview box.</li>
<li><b>Place and size it</b> with <code>boxSize</code> to cover the musical area, not just the visible geometry.</li>
<li><b>Choose what it does:</b> set <code>zoneState</code>, or leave it empty and only set <code>layerRules</code> / <code>zoneIntensityProfile</code>.</li>
<li><b>Set <code>localPlayerTag</code></b> (usually Player) so only the player triggers it, and give overlapping zones sensible <code>zonePriority</code> values.</li>
<li><b>Make sure the player can trigger it:</b> it needs a Collider, and one of the two objects needs a Rigidbody for trigger events.</li>
</ol>
<h3>Track-aware layer rules</h3>
<p>A <code>layerRules</code> entry can filter by state, track index or track name, then force a set of layers while it matches. That lets one zone add different stems depending on what is currently playing - for example, only add a choir layer while the Explore track is active.</p>
<h3>Start tracks, locks and preview boxes</h3>
<p><code>zoneStartTrackIndex</code> lets a zone enter its requested state on a specific track. <code>-1</code> keeps normal state defaults. If <code>zoneTrackLock</code> is on, the current track stays pinned while the zone is active, so playlist auto-advance cannot drift away from that room's cue.</p>
<p>The preview box is a real translucent mesh with a trigger BoxCollider, not a UI overlay. It is depth-tested and can be hidden separately for editing or Play Mode with <code>showPreviewBox</code> and <code>showPreviewBoxInPlayMode</code>. Every zone shares one cross-pipeline translucent material and is tinted per-zone through <code>previewColor</code> via a MaterialPropertyBlock, so changing one zone's color never affects the others and no extra materials leak into the scene.</p>
<h3>Zone layers and local labels</h3>
<p><code>extraLayers</code> are unconditional zone-owned layers: while the zone wins, those stems are forced on. <code>layerRules</code> are more precise; they can look at the current state, track index or track name before forcing layers. Use <code>extraLayers</code> for simple room color, and <code>layerRules</code> when the same room should behave differently for Explore, Combat or a named track.</p>
<p><code>BSTZoneWorldLabel</code> is an authoring aid for scene readability. It does not control music. It places fixed world-space text near a zone so designers can identify volumes in the scene. Tune <code>localOffset</code>, <code>faceRotation</code>, <code>fontSize</code>, <code>worldCharacterSize</code>, <code>textColor</code> and <code>alignment</code> for legibility, then use the zone's <code>showWorldLabel</code> and <code>showWorldLabelInPlayMode</code> toggles to decide whether the label appears in editor and Play Mode.</p>
<h3>Settings reference - world label</h3>
${settingRows(zoneWorldLabelSettings, 'en')}
<h3>How zones interact with code</h3>
<p>Zones are not a separate music engine; they feed intent into the same arbitration used by code. A normal <code>SetMusicState</code> call becomes the global fallback. While a zone is active, its state wins unless a request or state call uses <code>forceWhileInZone</code>. When the player exits, the toolkit resolves again and returns to the best remaining source.</p>
<p>If the game was silent before a zone or request temporarily started music, leaving the zone or removing the request returns to silence with the same musical timing. <code>autoStartState</code> only becomes a baseline after auto-start or <code>StartMusic</code> actually runs; merely filling the field does not make a silent scene resume music after a temporary zone.</p>
${code(`// Normal gameplay state becomes the fallback outside zones.
BST.SetMusicState("Explore", persistAfterLeavingZone: true);

// A cutscene can intentionally beat the active zone.
BST.SetMusicState("Tension",
    BSTTransitionMode.OnNextBar,
    crossfadeDuration: 0.5f,
    forceWhileInZone: true);`)}
<h3>Zone ownership reference</h3>
${settingRows([
 ['zoneState','Requests a state while inside.','İçerideyken state ister.','Leave empty for layer-only or intensity-only zones.','Sadece layer/intensity zone için boş bırak.'],
 ['overrideProfile','Temporarily swaps the music profile.','Müzik profilini geçici değiştirir.','Use for self-contained areas with their own score book.','Kendi skor defteri olan alanlarda kullan.'],
 ['extraLayers','Forces named layers while active.','Aktifken isimli layerları zorlar.','Good for room tone stems, crowd, weather or danger color.','Oda tonu, kalabalık, hava veya tehlike rengi için iyi.'],
 ['zoneIntensityProfile','Remaps the current 0-1 intensity value.','Mevcut 0-1 intensity değerini yeniden haritalar.','Use when the same danger value should sound different here.','Aynı danger değeri burada farklı duyulmalıysa kullan.'],
 ['zoneTrackLock','Pins playlist movement while active.','Aktifken playlist hareketini kilitler.','Use when the room must keep one exact cue.','Oda tek bir cue üzerinde kalmalıysa kullan.']
], 'en')}
${ex('A cave region uses a zone with <code>zoneState = "Tension"</code> and <code>zonePriority = 10</code>. A small shrine inside it uses a second zone with <code>zoneState = "Calm"</code> and <code>zonePriority = 20</code>. Standing in the shrine you hear Calm; step out and Tension returns; leave the cave entirely and your previous exploration music comes back.')}
${call('warn','If a zone never triggers','Check that the BoxCollider is a trigger, that <code>localPlayerTag</code> matches your player tag (or is empty), that a Rigidbody exists on one collider, and that a higher-priority zone is not already winning.')}
<h3>Settings reference - zone</h3>
${settingRows(zoneSettings, 'en')}
<h3>Settings reference - layer rule</h3>
${settingRows([
 ['ZoneLayerRule.stateName','Optional state filter for the rule.','Kural için opsiyonel state filtresi.','Empty means any state.','Boşsa her state.'],
 ['ZoneLayerRule.trackIndex','Optional track index filter.','Opsiyonel track index filtresi.','-1 means any index.','-1 her index demektir.'],
 ['ZoneLayerRule.trackName','Optional track name filter.','Opsiyonel track adı filtresi.','Use when track names are clearer than indices.','Track isimleri indexten daha netse kullan.'],
 ['ZoneLayerRule.layerNames','Layers forced while rule matches.','Kural eşleştiğinde zorlanan layerlar.','Use to make one room add its own stems.','Bir odanın kendi stemlerini eklemesi için kullan.']
], 'en')}`,
tr:`<p class="lead">Müzik Bölgeleri, sahneden yazılan müzikal niyettir. Dünyadaki bir yer müziği geçici değiştirebilir - gameplay kodu gerekmez.</p>
<h3>Bölgeler nasıl çalışır</h3>
<p>Bir Müzik Bölgesi bir trigger hacmidir. Tag'li bir collider girdiğinde bölge aktifleşir ve bir state isteyebilir, tüm profili override edebilir, layer zorlayabilir, intensity profilini override edebilir veya mevcut tracki kilitleyebilir. Collider çıkınca bölge devre dışı kalır ve toolkit kalan en iyi kaynağı çözer: hâlâ aktif bir request, global müzik statei veya sessizlik. Manuel zorladığın layerlar ve intensity de geri yüklenir.</p>
<p>Üst üste binen birden çok bölge bir yığın oluşturur. <b>Üst bölge</b> kazanır; önce <code>zonePriority</code>, sonra en son girilen belirler. Yani büyük sakin bir bölgenin içine konmuş küçük yoğun bir odanın, içindeyken devralması için sadece daha yüksek bir priority gerekir. Kısa bir <code>zoneDebounceTime</code>, tam trigger kenarında dururken titremeyi önler.</p>
<p><code>zoneTransitionMode</code>, zone stateinin ne zaman oturabileceğini belirler. <code>OnNextTransitionPoint</code> önce yazılmış <code>validExitBars</code> kapılarını, sonra <code>isTransitionPoint</code> işaretli sectionları, sonra da daha ileride yazılmış kapı yoksa güvenli section-end fallback'i kullanır. Bu fallback fade ile çalışıyorsa bed section bitmeden pre-roll edilir; böylece çıkış sert kesilmek yerine crossfade olur.</p>
<h3>Editörde kur</h3>
<ol class="steps">
<li><b>Bölgeyi oluştur.</b> <code>GameObject > BeatSync Toolkit > BST Music Zone</code>. Bir trigger BoxCollider ve yarı saydam önizleme kutusuyla gelir.</li>
<li><b>Yerleştir ve boyutlandır</b> (<code>boxSize</code>); sadece görünür geometriyi değil müzikal alanı kapsa.</li>
<li><b>Ne yapacağını seç:</b> <code>zoneState</code> ayarla ya da boş bırakıp sadece <code>layerRules</code> / <code>zoneIntensityProfile</code> ayarla.</li>
<li><b><code>localPlayerTag</code> ayarla</b> (genelde Player); sadece oyuncu tetiklesin ve üst üste binen bölgelere mantıklı <code>zonePriority</code> ver.</li>
<li><b>Oyuncunun tetikleyebildiğinden emin ol:</b> bir Collider gerekir ve iki objeden birinde trigger olayları için Rigidbody olmalı.</li>
</ol>
<h3>Track-aware layer kuralları</h3>
<p>Bir <code>layerRules</code> girişi state, track index veya track adına göre filtreleyebilir ve eşleştiği sürece bir layer setini zorlar. Bu, bir bölgenin o an çalana göre farklı stemler eklemesini sağlar - örneğin sadece Explore tracki aktifken bir koro layerı eklemek.</p>
<h3>Start track, kilit ve preview box</h3>
<p><code>zoneStartTrackIndex</code>, zone istenen statee girerken belirli bir trackten başlamayı sağlar. <code>-1</code> normal state varsayılanlarını korur. <code>zoneTrackLock</code> açıksa zone aktifken mevcut track sabit kalır; playlist auto-advance odanın cue'sundan uzaklaşamaz.</p>
<p>Preview box bir UI overlay değil, trigger BoxCollider taşıyan gerçek yarı saydam meshtir. Depth-tested çalışır ve editor/play görünürlüğü <code>showPreviewBox</code> ve <code>showPreviewBoxInPlayMode</code> ile ayrı ayrı kontrol edilir. Her zone tek bir cross-pipeline yarı saydam materyali paylaşır ve <code>previewColor</code> ile MaterialPropertyBlock üzerinden zone-özel renklenir; böylece bir zonenin rengini değiştirmek diğerlerini etkilemez ve sahneye fazladan materyal sızmaz.</p>
<h3>Zone layerları ve yerel label</h3>
<p><code>extraLayers</code> koşulsuz zone-owned layerlardır: zone kazandığı sürece bu stemler zorla açılır. <code>layerRules</code> daha hassastır; layer zorlamadan önce mevcut state, track index veya track adına bakabilir. Basit oda rengi için <code>extraLayers</code>, aynı oda Explore, Combat veya isimli tracke göre farklı davranacaksa <code>layerRules</code> kullan.</p>
<p><code>BSTZoneWorldLabel</code> sahne okunurluğu için authoring aracıdır. Müziği kontrol etmez. Designerların sahnedeki hacimleri tanıması için zone yakınında sabit world-space text yerleştirir. Okunurluk için <code>localOffset</code>, <code>faceRotation</code>, <code>fontSize</code>, <code>worldCharacterSize</code>, <code>textColor</code> ve <code>alignment</code> ayarla; labelın editor/play görünürlüğünü zone üzerindeki <code>showWorldLabel</code> ve <code>showWorldLabelInPlayMode</code> togglelarıyla yönet.</p>
<h3>Ayar referansı - world label</h3>
${settingRows(zoneWorldLabelSettings, 'tr')}
<h3>Zone kodla nasıl etkileşir</h3>
<p>Zone ayrı bir müzik motoru değildir; kodun kullandığı aynı arbitration sistemine niyet besler. Normal <code>SetMusicState</code> çağrısı global fallback olur. Zone aktifken zone state'i kazanır; ancak bir request veya state çağrısı <code>forceWhileInZone</code> kullanırsa zone'u geçebilir. Oyuncu çıkınca toolkit yeniden çözer ve kalan en iyi kaynağa döner.</p>
<p>Oyun zone veya request geçici olarak müzik başlatmadan önce sessizse, zone çıkışı veya request kaldırma sonrası aynı müzikal zamanlama ile tekrar sessizliğe döner. <code>autoStartState</code> yalnızca auto-start veya <code>StartMusic</code> gerçekten çalıştıktan sonra baseline olur; alanın dolu olması tek başına sessiz sahneyi zone sonrası müziğe döndürmez.</p>
${code(`// Normal gameplay state zone dışındaki fallback olur.
BST.SetMusicState("Explore", persistAfterLeavingZone: true);

// Cutscene aktif zone'u bilinçli geçebilir.
BST.SetMusicState("Tension",
    BSTTransitionMode.OnNextBar,
    crossfadeDuration: 0.5f,
    forceWhileInZone: true);`)}
<h3>Zone sahiplik referansı</h3>
${settingRows([
 ['zoneState','Requests a state while inside.','İçerideyken state ister.','Leave empty for layer-only or intensity-only zones.','Sadece layer/intensity zone için boş bırak.'],
 ['overrideProfile','Temporarily swaps the music profile.','Müzik profilini geçici değiştirir.','Use for self-contained areas with their own score book.','Kendi skor defteri olan alanlarda kullan.'],
 ['extraLayers','Forces named layers while active.','Aktifken isimli layerları zorlar.','Good for room tone stems, crowd, weather or danger color.','Oda tonu, kalabalık, hava veya tehlike rengi için iyi.'],
 ['zoneIntensityProfile','Remaps the current 0-1 intensity value.','Mevcut 0-1 intensity değerini yeniden haritalar.','Use when the same danger value should sound different here.','Aynı danger değeri burada farklı duyulmalıysa kullan.'],
 ['zoneTrackLock','Pins playlist movement while active.','Aktifken playlist hareketini kilitler.','Use when the room must keep one exact cue.','Oda tek bir cue üzerinde kalmalıysa kullan.']
], 'tr')}
${ex('Bir mağara bölgesi <code>zoneState = "Tension"</code> ve <code>zonePriority = 10</code> ile bir bölge kullanır. İçindeki küçük bir tapınak ise <code>zoneState = "Calm"</code> ve <code>zonePriority = 20</code> ile ikinci bir bölge kullanır. Tapınakta Calm duyarsın; dışarı çıkınca Tension döner; mağaradan tamamen çıkınca önceki keşif müziğin geri gelir.')}
${call('warn','Bir bölge hiç tetiklenmiyorsa','BoxCollider trigger mı, <code>localPlayerTag</code> oyuncu tag’i ile eşleşiyor mu (ya da boş mu), bir colliderda Rigidbody var mı ve daha yüksek öncelikli bir bölge zaten kazanıyor mu kontrol et.')}
<h3>Ayar referansı - bölge</h3>
${settingRows(zoneSettings, 'tr')}
<h3>Ayar referansı - layer kuralı</h3>
${settingRows([
 ['ZoneLayerRule.stateName','Optional state filter for the rule.','Kural için opsiyonel state filtresi.','Empty means any state.','Boşsa her state.'],
 ['ZoneLayerRule.trackIndex','Optional track index filter.','Opsiyonel track index filtresi.','-1 means any index.','-1 her index demektir.'],
 ['ZoneLayerRule.trackName','Optional track name filter.','Opsiyonel track adı filtresi.','Use when track names are clearer than indices.','Track isimleri indexten daha netse kullan.'],
 ['ZoneLayerRule.layerNames','Layers forced while rule matches.','Kural eşleştiğinde zorlanan layerlar.','Use to make one room add its own stems.','Bir odanın kendi stemlerini eklemesi için kullan.']
], 'tr')}`},

'requests':{
en:`<p class="lead">Requests are how the toolkit decides which state should play when several systems ask at once. They turn a chaotic race into clean, predictable arbitration.</p>
<h3>The problem they solve</h3>
<p>Imagine combat, a low-health sting and a scripted cutscene all wanting different music in the same second. If each called <code>SetMusicState</code>, it would become last-caller-wins and flicker. Instead, each system <b>pushes a request</b> with an id and a priority, and the toolkit always performs the highest-priority active request. When a situation ends, that system removes its own request and the music falls back to whatever is next.</p>
<h3>Resolution order</h3>
<p>When choosing what to play, the toolkit considers, in order: the highest-priority state request (which can beat an active zone if <code>forceWhileInZone</code> is set), then the active top music zone's state, then the global state last set by <code>SetMusicState</code> or <code>StartMusic</code>. If nothing resolves, music stops with the appropriate timing.</p>
${call('note','Requests do not carry crossfade overrides','A request stores id, state, priority, <code>forceWhileInZone</code> and quantized timing. If one specific moment needs a custom crossfade length, use <code>SetMusicState</code> for that moment or tune the conductor default crossfade used by request-driven switches.')}
<h3>Drive it from code</h3>
${code(`// Push on enter, remove on exit. Treat a request like a subscription.
BST.PushStateRequest("combat", "Combat", priority: 20);
BST.PushStateRequest("cutscene", "Tension", priority: 100, forceWhileInZone: true);

// When the moment ends, remove just yours by id.
BST.RemoveStateRequest("cutscene");   // music falls back to Combat
BST.RemoveStateRequest("combat");     // falls back to zone or global music

BST.ClearStateRequests();`)}
${ex('Combat pushes <b>combat</b> at priority 20. The player drops to low health, so that system pushes <b>low_health</b> at priority 50 and wins. A scripted cutscene then pushes at priority 100 and owns the score. As each ends and removes its id, the music steps neatly back down: cutscene -> low_health -> combat -> exploration.')}
${call('tip','Use stable ids','Give each system one fixed id like combat, low_health or cutscene. Pushing the same id again replaces its request instead of stacking duplicates.')}
<h3>Push vs TryPush</h3>
<p><code>PushStateRequest</code> is the simple command form. <code>TryPushStateRequest</code> returns <code>false</code> when the request cannot be accepted, usually because the id or state is missing or the active conductor/profile cannot resolve the state. Use <code>Try</code> calls in tools, optional systems and startup flows where you want to show a clear message instead of assuming the score is ready.</p>
${code(`if (!BST.TryPushStateRequest("boss_phase", "Boss", priority: 80, forceWhileInZone: true))
{
    Debug.LogWarning("Boss music request failed. Check state name and active profile.");
}`)}
<h3>Request lifecycle rules</h3>
${settingRows([
 ['Same id pushed again','Replaces the existing request.','Aynı id tekrar itilirse mevcut request değişir.','Use this to update priority or target state without duplicates.','Duplicate oluşturmadan priority veya state güncellemek için kullan.'],
 ['RemoveStateRequest','Removes only the matching id.','Sadece eşleşen idyi kaldırır.','Call it when that gameplay condition ends.','O gameplay durumu bitince çağır.'],
 ['ClearStateRequests','Removes all requests.','Tüm requestleri kaldırır.','Useful for scene reset, test cleanup or hard state ownership changes.','Sahne reseti, test temizliği veya sert sahiplik değişimi için kullan.'],
 ['GetActiveStateRequests','Returns the active request list.','Aktif request listesini döndürür.','Use for debug UI and buyer-facing panels.','Debug UI ve alıcı paneli için kullan.']
], 'en')}
<h3>No-code request testing</h3>
<p>The Runtime Control Panel has request slots so designers can test arbitration before code exists. Each slot has an id, state, priority, <code>Force while in zone</code>, <code>Quantize</code>, and an active push/remove toggle. Use it to model combat, low health and cutscenes fighting for the score, then wire the same ids from gameplay.</p>
<h3>Settings reference - request fields</h3>
${settingRows([
 ['requestId','Unique id used to replace or remove the request.','Requesti değiştirmek veya silmek için benzersiz id.','Use stable ids like combat, cutscene, low_health.','combat, cutscene, low_health gibi sabit id kullan.'],
 ['requestedState','State name requested.','İstenen state adı.','Must match a profile state name.','Profil state adıyla eşleşmeli.'],
 ['priority','Higher priority wins.','Yüksek priority kazanır.','Story or cutscene usually beats combat.','Hikaye veya cutscene genelde combatı geçer.'],
 ['forceWhileInZone','Allows the request to beat zones.','Requestin bölgeleri geçmesine izin verir.','Use for scripted moments that must own the score.','Skoru kesin sahiplenmesi gereken scripted anlarda kullan.'],
 ['quantizeTransition','Uses musical timing for the switch.','Geçiş için müzikal zamanlama kullanır.','Keep on for normal gameplay.','Normal gameplayde açık tut.']
], 'en')}`,
tr:`<p class="lead">Requestler, aynı anda birkaç sistem istek yaptığında hangi state'in çalacağına toolkit'in nasıl karar verdiğidir. Kaotik bir yarışı temiz, öngörülebilir bir önceliklendirmeye çevirir.</p>
<h3>Çözdükleri sorun</h3>
<p>Aynı saniyede combat, düşük-can vurgusu ve scripted bir cutscene'in hepsinin farklı müzik istediğini düşün. Her biri <code>SetMusicState</code> çağırsaydı bu "son çağıran kazanır"a döner ve titrerdi. Bunun yerine her sistem bir id ve priority ile bir <b>request iter</b> ve toolkit her zaman en yüksek öncelikli aktif requesti icra eder. Bir durum bitince o sistem kendi requestini kaldırır ve müzik sıradakine düşer.</p>
<h3>Çözüm sırası</h3>
<p>Ne çalacağına karar verirken toolkit şu sırayı izler: en yüksek öncelikli state requesti (<code>forceWhileInZone</code> ayarlıysa aktif bir bölgeyi geçebilir), sonra aktif üst müzik bölgesinin state'i, sonra en son <code>SetMusicState</code> veya <code>StartMusic</code> ile ayarlanan global state. Hiçbiri çözülmezse müzik uygun zamanlamayla durur.</p>
${call('note','Requestler crossfade override taşımaz','Bir request id, state, priority, <code>forceWhileInZone</code> ve quantize timing saklar. Belirli bir an özel crossfade süresi istiyorsa o an için <code>SetMusicState</code> kullan veya request-driven geçişlerin kullandığı conductor default crossfade değerini ayarla.')}
<h3>Koddan sür</h3>
${code(`// Girişte it, çıkışta kaldır. Requesti bir abonelik gibi düşün.
BST.PushStateRequest("combat", "Combat", priority: 20);
BST.PushStateRequest("cutscene", "Tension", priority: 100, forceWhileInZone: true);

// An bitince sadece kendininkini id ile kaldır.
BST.RemoveStateRequest("cutscene");   // müzik Combat'a düşer
BST.RemoveStateRequest("combat");     // bölge veya global müziğe düşer

BST.ClearStateRequests();`)}
${ex('Combat, priority 20 ile <b>combat</b> iter. Oyuncunun canı düşer, o sistem priority 50 ile <b>low_health</b> iter ve kazanır. Sonra scripted bir cutscene priority 100 ile iter ve skoru sahiplenir. Her biri bitip id’sini kaldırdıkça müzik düzgünce geri iner: cutscene -> low_health -> combat -> keşif.')}
${call('tip','Sabit id kullan','Her sisteme combat, low_health veya cutscene gibi tek sabit bir id ver. Aynı id’yi tekrar itmek, çoğaltma yapmak yerine o requesti değiştirir.')}
<h3>Push ve TryPush farkı</h3>
<p><code>PushStateRequest</code> basit komut formudur. <code>TryPushStateRequest</code>, request kabul edilemezse <code>false</code> döndürür; genelde id veya state eksiktir ya da aktif conductor/profil state'i çözemiyordur. Toollarda, opsiyonel sistemlerde ve startup akışlarında skor hazır varsaymak yerine net mesaj göstermek için <code>Try</code> çağrılarını kullan.</p>
${code(`if (!BST.TryPushStateRequest("boss_phase", "Boss", priority: 80, forceWhileInZone: true))
{
    Debug.LogWarning("Boss music request failed. Check state name and active profile.");
}`)}
<h3>Request yaşam döngüsü kuralları</h3>
${settingRows([
 ['Same id pushed again','Replaces the existing request.','Aynı id tekrar itilirse mevcut request değişir.','Use this to update priority or target state without duplicates.','Duplicate oluşturmadan priority veya state güncellemek için kullan.'],
 ['RemoveStateRequest','Removes only the matching id.','Sadece eşleşen idyi kaldırır.','Call it when that gameplay condition ends.','O gameplay durumu bitince çağır.'],
 ['ClearStateRequests','Removes all requests.','Tüm requestleri kaldırır.','Useful for scene reset, test cleanup or hard state ownership changes.','Sahne reseti, test temizliği veya sert sahiplik değişimi için kullan.'],
 ['GetActiveStateRequests','Returns the active request list.','Aktif request listesini döndürür.','Use for debug UI and buyer-facing panels.','Debug UI ve alıcı paneli için kullan.']
], 'tr')}
<h3>Kodsuz request testi</h3>
<p>Runtime Control Panel request slotları taşır; böylece designer kod yazılmadan arbitration test edebilir. Her slot id, state, priority, <code>Force while in zone</code>, <code>Quantize</code> ve aktif push/remove toggle içerir. Combat, düşük can ve cutscene skor için yarışırken nasıl davranacağını burada modelle, sonra aynı idleri gameplay kodundan bağla.</p>
<h3>Ayar referansı - request alanları</h3>
${settingRows([
 ['requestId','Unique id used to replace or remove the request.','Requesti değiştirmek veya silmek için benzersiz id.','Use stable ids like combat, cutscene, low_health.','combat, cutscene, low_health gibi sabit id kullan.'],
 ['requestedState','State name requested.','İstenen state adı.','Must match a profile state name.','Profil state adıyla eşleşmeli.'],
 ['priority','Higher priority wins.','Yüksek priority kazanır.','Story or cutscene usually beats combat.','Hikaye veya cutscene genelde combatı geçer.'],
 ['forceWhileInZone','Allows the request to beat zones.','Requestin bölgeleri geçmesine izin verir.','Use for scripted moments that must own the score.','Skoru kesin sahiplenmesi gereken scripted anlarda kullan.'],
 ['quantizeTransition','Uses musical timing for the switch.','Geçiş için müzikal zamanlama kullanır.','Keep on for normal gameplay.','Normal gameplayde açık tut.']
], 'tr')}`},

'stingers-ducking':{
en:`<p class="lead">Stingers are musical punctuation played on top of the score. Ducking dips the music so something else - usually dialogue - can be heard clearly.</p>
<h3>Stingers</h3>
<p>Define reusable accents as named <code>stingerCues</code> on the profile, then fire one by name from anywhere. Each cue has its own volume, a <code>quantizeToBar</code> flag and a fade-in. When a stinger is quantized and you fire several before the next bar, only the most recent plays - gameplay accents usually want the freshest hit, not a pile-up.</p>
${call('note','Stinger fade inheritance','A cue or direct stinger with <code>fadeIn = -1</code> inherits <code>defaultStingerFadeIn</code>. It does not inherit <code>defaultCrossfadeDuration</code>, because stinger fade-in is separate from music crossfades.')}
${code(`// A named cue from the profile.
BST.PlayStinger("Victory");

// Or any clip directly: hit now, or wait for the bar.
BST.PlayStinger(myClip, quantize: false);
BST.PlayStinger(myClip, quantize: true, fadeIn: 0.1f);`)}
<h3>Ducking</h3>
<p>Ducking lowers the music to a target volume with a fade, then restores it. By default the base music and stem layers duck together; turn <code>duckLayers</code> off if some stems must stay present. Stingers stay in front by default so musical hits remain clear, but <code>duckStingers</code> can make one-shot stingers duck too when dialogue or key audio must win completely. Fast in and slightly slower out is the common feel for speech clarity.</p>
${code(`// Dip to 30 percent for dialogue, then restore.
BST.StartDucking(targetVolume: 0.3f, fadeTime: 0.25f);
// ... dialogue plays ...
BST.StopDucking(fadeTime: 0.5f);`)}
${ex('A cutscene begins: duck the music to 0.2 over half a second and play a "Reveal" stinger on the downbeat. When the scene ends, stop ducking over one second and the score swells back to full.')}
${call('warn','Keep stingers out of section lists','Stingers are one-shots. A stinger placed in a track section list will be treated as a looping musical block. Always use the profile stinger cues.')}
<h3>Named cues vs direct clips</h3>
${settingRows([
 ['PlayStinger("Victory")','Looks up a cue in the active profile.','Aktif profilde cue arar.','Best for shipped gameplay because volume, quantize and fade live in authoring.','Volume, quantize ve fade authoringde yaşadığı için shipped gameplay için en iyisi.'],
 ['PlayStinger(AudioClip)','Plays a supplied clip directly.','Verilen clipi doğrudan çalar.','Best for prototypes, tools or dynamic clip sources.','Prototype, tool veya dinamik clip kaynakları için iyi.'],
 ['GetAvailableStingerCueNames','Lists named cues from the active profile.','Aktif profildeki isimli cueları listeler.','Use to build safe UI instead of hardcoding options.','Seçenekleri hardcode etmek yerine güvenli UI yapmak için kullan.']
], 'en')}
<h3>Ducking inheritance and layer behavior</h3>
<p><code>StartDucking(targetVolume: -1, fadeTime: -1)</code> uses <code>duckingTargetVolume</code> and <code>duckingFadeIn</code>. <code>StopDucking(fadeTime: -1)</code> uses <code>duckingFadeOut</code>. <code>SetDuckLayers(false)</code> keeps stems from ducking with the base music; leave it true when speech clarity matters more than preserving the arrangement. <code>SetDuckStingers(true)</code> also applies the ducking multiplier to the stinger source; leave it false when stingers should punch through as musical accents.</p>
<h3>Settings reference</h3>
${settingRows([
 ['cueName','Gameplay/API name for the stinger.','Stinger için gameplay/API adı.','Call it with BST.PlayStinger.','BST.PlayStinger ile çağır.'],
 ['clip','One-shot audio clip.','Tek seferlik audio clip.','Do not place stingers in section lists.','Stingerları section listesine koyma.'],
 ['volume','Cue-specific stinger volume.','Cueya özel stinger sesi.','Balance each accent against the score.','Her vurguyu skora göre dengele.'],
 ['quantizeToBar','Waits for the next bar before playing.','Çalmadan önce sonraki barı bekler.','Use for musical hits; turn off for urgent UI feedback.','Müzikal hit için kullan; acil UI feedbackte kapat.'],
 ['fadeIn','Cue fade-in; -1 inherits the conductor.','Cue fade-in; -1 conductoru miras alır.','Use 0 for hard hits, longer for swells.','Sert hitte 0, swell için uzun kullan.'],
 ['duckingTargetVolume','Target music volume during ducking.','Ducking sırasında hedef müzik sesi.','Dialogue often wants 0.25-0.4.','Diyalog genelde 0.25-0.4 ister.'],
 ['duckLayers','Whether stem layers duck too.','Stem layerları da kısılsın mı.','On is safest for dialogue clarity.','Diyalog netliği için açık en güvenlisidir.'],
 ['duckStingers','Whether one-shot stingers duck too.','Tek seferlik stingerlar da kısılsın mı.','Off keeps accents punchy; on keeps dialogue fully clear.','Kapalı vurgu gücünü korur; açık diyalogu tamamen temiz bırakır.']
], 'en')}`,
tr:`<p class="lead">Stingerlar, skorun üstünde çalınan müzikal noktalama işaretleridir. Ducking, başka bir şey - genelde diyalog - net duyulsun diye müziği kısar.</p>
<h3>Stingerlar</h3>
<p>Yeniden kullanılabilir vurguları profilde isimli <code>stingerCues</code> olarak tanımla, sonra her yerden isimle çal. Her cue'nun kendi sesi, bir <code>quantizeToBar</code> bayrağı ve bir fade-in'i vardır. Bir stinger quantize edilmişse ve sonraki bardan önce birkaç tane çalarsan, sadece en günceli çalınır - gameplay vurguları genelde yığılma değil en taze vuruşu ister.</p>
${call('note','Stinger fade mirası','Bir cue veya direct stinger <code>fadeIn = -1</code> kullanırsa <code>defaultStingerFadeIn</code> miras alır. <code>defaultCrossfadeDuration</code> miras almaz; çünkü stinger fade-in, müzik crossfadeinden ayrı bir ayardır.')}
${code(`// Profilden isimli bir cue.
BST.PlayStinger("Victory");

// Ya da herhangi bir klip doğrudan: şimdi vur veya barı bekle.
BST.PlayStinger(myClip, quantize: false);
BST.PlayStinger(myClip, quantize: true, fadeIn: 0.1f);`)}
<h3>Ducking</h3>
<p>Ducking, müziği bir fade ile hedef sese kısar, sonra geri yükler. Varsayılan olarak base müzik ve stem layerlar birlikte kısılır; bazı stemler önde kalmalıysa <code>duckLayers</code>'ı kapat. Stingerlar varsayılan olarak önde kalır ki müzikal vurgular net duyulsun; diyalog veya önemli ses tamamen kazanmalıysa <code>duckStingers</code> ile tek seferlik stingerları da kısabilirsin. Konuşma netliği için yaygın his hızlı giriş ve biraz daha yavaş çıkıştır.</p>
${code(`// Diyalog için yüzde 30'a kıs, sonra geri yükle.
BST.StartDucking(targetVolume: 0.3f, fadeTime: 0.25f);
// ... diyalog çalar ...
BST.StopDucking(fadeTime: 0.5f);`)}
${ex('Bir cutscene başlar: müziği yarım saniyede 0.2’ye kıs ve downbeat’te bir "Reveal" stingerı çal. Sahne bitince ducking’i bir saniyede durdur ve skor tekrar dolu seviyeye yükselir.')}
${call('warn','Stingerları section listesinden uzak tut','Stingerlar tek seferliktir. Bir track section listesine konan bir stinger, loop yapan müzikal blok gibi işlenir. Her zaman profil stinger cuelarını kullan.')}
<h3>İsimli cue ve direct clip farkı</h3>
${settingRows([
 ['PlayStinger("Victory")','Looks up a cue in the active profile.','Aktif profilde cue arar.','Best for shipped gameplay because volume, quantize and fade live in authoring.','Volume, quantize ve fade authoringde yaşadığı için shipped gameplay için en iyisi.'],
 ['PlayStinger(AudioClip)','Plays a supplied clip directly.','Verilen clipi doğrudan çalar.','Best for prototypes, tools or dynamic clip sources.','Prototype, tool veya dinamik clip kaynakları için iyi.'],
 ['GetAvailableStingerCueNames','Lists named cues from the active profile.','Aktif profildeki isimli cueları listeler.','Use to build safe UI instead of hardcoding options.','Seçenekleri hardcode etmek yerine güvenli UI yapmak için kullan.']
], 'tr')}
<h3>Ducking mirası ve layer davranışı</h3>
<p><code>StartDucking(targetVolume: -1, fadeTime: -1)</code> <code>duckingTargetVolume</code> ve <code>duckingFadeIn</code> kullanır. <code>StopDucking(fadeTime: -1)</code> <code>duckingFadeOut</code> kullanır. <code>SetDuckLayers(false)</code> stemlerin base müzikle birlikte kısılmasını engeller; konuşma netliği aranjmanı korumaktan önemliyse true bırak. <code>SetDuckStingers(true)</code> ducking çarpanını stinger kaynağına da uygular; stingerların müzikal vurgu olarak öne çıkmasını istiyorsan false bırak.</p>
<h3>Ayar referansı</h3>
${settingRows([
 ['cueName','Gameplay/API name for the stinger.','Stinger için gameplay/API adı.','Call it with BST.PlayStinger.','BST.PlayStinger ile çağır.'],
 ['clip','One-shot audio clip.','Tek seferlik audio clip.','Do not place stingers in section lists.','Stingerları section listesine koyma.'],
 ['volume','Cue-specific stinger volume.','Cueya özel stinger sesi.','Balance each accent against the score.','Her vurguyu skora göre dengele.'],
 ['quantizeToBar','Waits for the next bar before playing.','Çalmadan önce sonraki barı bekler.','Use for musical hits; turn off for urgent UI feedback.','Müzikal hit için kullan; acil UI feedbackte kapat.'],
 ['fadeIn','Cue fade-in; -1 inherits the conductor.','Cue fade-in; -1 conductoru miras alır.','Use 0 for hard hits, longer for swells.','Sert hitte 0, swell için uzun kullan.'],
 ['duckingTargetVolume','Target music volume during ducking.','Ducking sırasında hedef müzik sesi.','Dialogue often wants 0.25-0.4.','Diyalog genelde 0.25-0.4 ister.'],
 ['duckLayers','Whether stem layers duck too.','Stem layerları da kısılsın mı.','On is safest for dialogue clarity.','Diyalog netliği için açık en güvenlisidir.'],
 ['duckStingers','Whether one-shot stingers duck too.','Tek seferlik stingerlar da kısılsın mı.','Off keeps accents punchy; on keeps dialogue fully clear.','Kapalı vurgu gücünü korur; açık diyalogu tamamen temiz bırakır.']
], 'tr')}`},

'quantization':{
en:`<p class="lead">Quantization is what makes the toolkit sound musical. It is the difference between "the music changed" and "the music changed on the beat".</p>
<h3>How timing is chosen</h3>
<p>Most changes accept a transition mode or a simple <code>quantize</code> flag. With quantization on, the change waits for the next musical boundary before it happens, so it lands in time instead of mid-note. With it off, the change happens instantly - right for hard cuts, deaths and sudden scares.</p>
<p>You usually do not pass a mode on every call. Set the defaults once on the Conductor (<code>quantizeStateChangesToBar</code>, <code>queueSectionChangesToValidExit</code>, <code>quantizeIntensityChanges</code>) and only override per call when a specific moment needs different timing.</p>
${code(`BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar);   // snappy but musical
BST.SetMusicState("Boss",   BSTTransitionMode.OnSectionEnd); // finish the phrase first
BST.SetMusicStateImmediate("GameOver");                      // cut now
BST.AddLayer("Hit", quantize: false);                        // instant accent`)}
${code(`// Timing and fade length are separate choices.
BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f);
BST.SetMusicState("Calm",   BSTTransitionMode.OnSectionEnd, crossfadeDuration: 2.5f);`)}
${call('note','Section timing needs sections','OnSectionEnd and OnNextTransitionPoint only apply on tracks with useSections enabled. On a plain base-clip track they behave like an immediate or next-bar change.')}
${call('note','Transition point hierarchy','OnNextTransitionPoint checks authored bar exits first, then sections marked as transition points. If the track has no explicit transition points, normal section ends are accepted as the safe fallback.')}
${call('note','Same-state track jumps can be section-aware','Use the BSTTransitionMode overload of JumpToTrack, or SetMusicState on the same state with a startTrackIndex. OnSectionEnd waits for the current section to finish; OnNextTransitionPoint can leave through validExitBars before jumping to the target track.')}
${call('note','Section-end pre-roll','When an OnSectionEnd change has a fade, the toolkit may start the target base/section bed early and prepare target track stems on the same DSP timeline. The visible state, track, section, bar clock, layer ownership and events still commit at the real section end.')}
${call('tip','Testing section-end fades in the panel','In the Runtime Control Panel, the States tab has State Fade and the Tracks tab has Track Fade. Leave the value at -1 to inherit the Conductor defaultCrossfadeDuration, set 0 for a hard boundary cut, or set an explicit value such as 2.00 to hear the two-phase OnSectionEnd pre-roll overlap.')}
${ex('Example: start on a section-based full mix, set Track Jump Mode to Section End, set Track Fade to 2.00, then jump to a stem track. The old section finishes logically at its real end, while the target bed and prepared stems can overlap before the boundary.')}
<h3>Which timing control applies where</h3>
${settingRows([
 ['State changes','Use BSTTransitionMode plus crossfadeDuration.','BSTTransitionMode ve crossfadeDuration kullanır.','Choose the musical boundary and fade length separately. In the panel, State Fade maps to this value.','Müzikal sınırı ve fade uzunluğunu ayrı seç. Panelde State Fade bu değere denk gelir.'],
 ['Track jumps','Use bool quantize for next-bar jumps or BSTTransitionMode for section-aware jumps.','Next-bar jump için bool quantize, section-aware jump için BSTTransitionMode kullanır.','Use OnSectionEnd for phrase-end jumps or OnNextTransitionPoint when a section track has valid exit bars. In the panel, Track Fade maps to crossfadeDuration.','Cümle sonunda atlamak için OnSectionEnd, valid exit bar varsa OnNextTransitionPoint kullan. Panelde Track Fade crossfadeDuration değerine denk gelir.'],
 ['Layer changes','Use quantize plus fade overrides.','quantize ve fade override kullanır.','Quantize picks when; fades pick how fast.','Quantize ne zaman, fade ne kadar hızlı olduğunu seçer.'],
 ['Section jumps','Use quantize, crossfade and valid exits.','quantize, crossfade ve valid exit kullanır.','queueSectionChangesToValidExit keeps authored form intact.','queueSectionChangesToValidExit yazılmış formu korur.'],
 ['Intensity changes','Use quantize and smooth.','quantize ve smooth kullanır.','Smooth moves the value; quantize schedules layer changes.','Smooth değeri taşır; quantize layer değişimini zamanlar.'],
 ['Stingers','Use quantizeToBar or direct quantize flag.','quantizeToBar veya direct quantize flag kullanır.','Only the latest queued stinger survives before the bar.','Bardan önce sıradaki sadece en güncel stinger kalır.']
], 'en')}
<h3>Settings reference - transition modes</h3>
${settingRows([
 ['Immediate','Happens now, even mid-bar.','Hemen olur, bar ortasında bile.','Maximum response, least musical. Use for hard cuts.','En hızlı tepki, en az müzikal. Sert kesit için kullan.'],
 ['OnNextBar','Waits for the start of the next bar.','Sonraki barın başını bekler.','The best default for state and layer changes.','State ve layer değişimleri için en iyi varsayılan.'],
 ['OnSectionEnd','Waits until the current section finishes.','Mevcut section bitene kadar bekler.','With fades, the base/section bed can pre-roll while logical state commits at section end.','Fade varsa base/section bed pre-roll yapabilir; logical state section sonunda commit edilir.'],
 ['OnNextTransitionPoint','Waits for the next valid transition point or exit bar.','Sonraki geçerli transition point/exit barı bekler.','Best for section-aware scores.','Section-aware skorlar için en iyi yol.']
], 'en')}`,
tr:`<p class="lead">Quantize, toolkit'i müzikal yapan şeydir. "Müzik değişti" ile "müzik vuruşta değişti" arasındaki farktır.</p>
<h3>Zamanlama nasıl seçilir</h3>
<p>Çoğu değişiklik bir transition modu ya da basit bir <code>quantize</code> bayrağı alır. Quantize açıkken değişiklik gerçekleşmeden önce bir sonraki müzikal sınırı bekler; böylece nota ortasında değil tam zamanında oturur. Kapalıyken değişiklik anında olur - sert kesit, ölüm ve ani korkular için doğru.</p>
<p>Genelde her çağrıda mod geçmezsin. Varsayılanları Conductorda bir kez ayarla (<code>quantizeStateChangesToBar</code>, <code>queueSectionChangesToValidExit</code>, <code>quantizeIntensityChanges</code>) ve sadece belirli bir an farklı zamanlama gerektirdiğinde çağrı bazında override et.</p>
${code(`BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar);   // hızlı ama müzikal
BST.SetMusicState("Boss",   BSTTransitionMode.OnSectionEnd); // önce cümleyi bitir
BST.SetMusicStateImmediate("GameOver");                      // şimdi kes
BST.AddLayer("Hit", quantize: false);                        // anlık vurgu`)}
${code(`// Zamanlama ve fade uzunluğu ayrı seçimlerdir.
BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f);
BST.SetMusicState("Calm",   BSTTransitionMode.OnSectionEnd, crossfadeDuration: 2.5f);`)}
${call('note','Section zamanlaması section ister','OnSectionEnd ve OnNextTransitionPoint yalnızca useSections açık tracklerde geçerlidir. Düz bir base-clip trackte anlık veya sonraki-bar değişimi gibi davranır.')}
${call('note','Transition point hiyerarşisi','OnNextTransitionPoint önce yazılmış bar exitlerini, sonra transition point işaretli sectionları kontrol eder. Trackte hiç explicit transition point yoksa normal section sonları güvenli fallback olarak kabul edilir.')}
${call('note','Aynı-state track jump’ları section-aware olabilir','JumpToTrack için BSTTransitionMode overload’unu veya aynı state üzerinde startTrackIndex ile SetMusicState kullan. OnSectionEnd mevcut section’ın bitmesini bekler; OnNextTransitionPoint hedef track’e geçmeden önce validExitBars üzerinden çıkabilir.')}
${call('note','Section-end pre-roll','Fade olan OnSectionEnd değişiminde toolkit hedef base/section bed sesini erken başlatabilir ve hedef track stemlerini aynı DSP zaman çizgisinde hazırlayabilir. Görünen state, track, section, bar clock, layer ownership ve eventler yine gerçek section sonunda commit edilir.')}
${call('tip','Panelde section-end fade testi','Runtime Control Panel içinde States sekmesinde State Fade, Tracks sekmesinde Track Fade vardır. -1 Conductor defaultCrossfadeDuration miras alır, 0 sert boundary kesiti yapar, 2.00 gibi açık bir değer iki fazlı OnSectionEnd pre-roll overlap’ini duymanı sağlar.')}
${ex('Örnek: section’lı full mixte başla, Track Jump Mode değerini Section End yap, Track Fade değerini 2.00 yap ve stemli bir track’e jump et. Eski section logical olarak gerçek sonunda biter; hedef bed ve hazırlanan stemler boundary öncesinde overlap alabilir.')}
<h3>Hangi zamanlama kontrolü nerede geçerli</h3>
${settingRows([
 ['State changes','Use BSTTransitionMode plus crossfadeDuration.','BSTTransitionMode ve crossfadeDuration kullanır.','Choose the musical boundary and fade length separately. In the panel, State Fade maps to this value.','Müzikal sınırı ve fade uzunluğunu ayrı seç. Panelde State Fade bu değere denk gelir.'],
 ['Track jumps','Use bool quantize for next-bar jumps or BSTTransitionMode for section-aware jumps.','Next-bar jump için bool quantize, section-aware jump için BSTTransitionMode kullanır.','Use OnSectionEnd for phrase-end jumps or OnNextTransitionPoint when a section track has valid exit bars. In the panel, Track Fade maps to crossfadeDuration.','Cümle sonunda atlamak için OnSectionEnd, valid exit bar varsa OnNextTransitionPoint kullan. Panelde Track Fade crossfadeDuration değerine denk gelir.'],
 ['Layer changes','Use quantize plus fade overrides.','quantize ve fade override kullanır.','Quantize picks when; fades pick how fast.','Quantize ne zaman, fade ne kadar hızlı olduğunu seçer.'],
 ['Section jumps','Use quantize, crossfade and valid exits.','quantize, crossfade ve valid exit kullanır.','queueSectionChangesToValidExit keeps authored form intact.','queueSectionChangesToValidExit yazılmış formu korur.'],
 ['Intensity changes','Use quantize and smooth.','quantize ve smooth kullanır.','Smooth moves the value; quantize schedules layer changes.','Smooth değeri taşır; quantize layer değişimini zamanlar.'],
 ['Stingers','Use quantizeToBar or direct quantize flag.','quantizeToBar veya direct quantize flag kullanır.','Only the latest queued stinger survives before the bar.','Bardan önce sıradaki sadece en güncel stinger kalır.']
], 'tr')}
<h3>Ayar referansı - transition modları</h3>
${settingRows([
 ['Immediate','Happens now, even mid-bar.','Hemen olur, bar ortasında bile.','Maximum response, least musical. Use for hard cuts.','En hızlı tepki, en az müzikal. Sert kesit için kullan.'],
 ['OnNextBar','Waits for the start of the next bar.','Sonraki barın başını bekler.','The best default for state and layer changes.','State ve layer değişimleri için en iyi varsayılan.'],
 ['OnSectionEnd','Waits until the current section finishes.','Mevcut section bitene kadar bekler.','With fades, the base/section bed can pre-roll while logical state commits at section end.','Fade varsa base/section bed pre-roll yapabilir; logical state section sonunda commit edilir.'],
 ['OnNextTransitionPoint','Waits for the next valid transition point or exit bar.','Sonraki geçerli transition point/exit barı bekler.','Best for section-aware scores.','Section-aware skorlar için en iyi yol.']
], 'tr')}`},

'playlist':{
en:`<p class="lead">A state with several tracks is a playlist. Track lock pins the music to one track when gameplay needs exact control.</p>
<h3>How playlists behave</h3>
<p>Add more than one track to a state and the Conductor can move through them. A state with a single track loops it when <code>loopIfSingleTrack</code> is on. With multiple tracks, <code>autoAdvancePlaylist</code> moves to another track when the current one finishes, <code>autoAdvanceShuffle</code> makes that choice random, and <code>defaultStartTrackIndex</code> chooses where a state begins. A small random <code>autoAdvanceDelayMin/Max</code> adds breathing room between songs.</p>
<h3>Track lock</h3>
<p>Lock keeps the current track playing - auto-advance will not move off it, and a single locked track loops. Use it for a moment that must stay on one specific piece of music, like a boss fight. Manual lock and zone lock are tracked separately, so the track is locked if either is active, and branch conditions can read the lock state too.</p>
${code(`BST.LockCurrentTrack();
BST.JumpToTrack(1, crossfadeDuration: 1f, quantize: true);
BST.UnlockCurrentTrack();

int index   = BST.GetCurrentTrackIndex();
string name = BST.GetCurrentTrackName();`)}
${ex('An exploration state holds three ambient tracks. With auto-advance and shuffle on, they rotate with a few seconds between them so the area never feels repetitive. When the boss appears you lock the track so the playlist cannot drift mid-fight, and unlock it when the fight ends.')}
${call('tip','A zone can lock too','A Music Zone with <code>zoneTrackLock</code> on locks the track while the player is inside and releases it on exit, with no code at all.')}
<h3>Settings reference - playlist</h3>
${settingRows(conductorSettings.slice(20,25), 'en')}`,
tr:`<p class="lead">Birden çok trackli bir state bir playlisttir. Track lock, gameplay kesin kontrol istediğinde müziği tek bir tracke sabitler.</p>
<h3>Playlistler nasıl davranır</h3>
<p>Bir state'e birden fazla track ekle; Conductor aralarında ilerleyebilir. Tek trackli bir state, <code>loopIfSingleTrack</code> açıkken onu loop eder. Birden çok trackte <code>autoAdvancePlaylist</code> mevcut track bitince başka tracke geçer, <code>autoAdvanceShuffle</code> bu seçimi rastgele yapar ve <code>defaultStartTrackIndex</code> state'in nereden başlayacağını seçer. Küçük rastgele bir <code>autoAdvanceDelayMin/Max</code> şarkılar arasına nefes alanı koyar.</p>
<h3>Track lock</h3>
<p>Lock mevcut tracki çalmaya devam ettirir - auto-advance ondan ayrılmaz ve tek kilitli track loop eder. Boss dövüşü gibi tek bir müzik parçasında kalması gereken bir an için kullan. Manuel lock ve bölge lock ayrı izlenir; yani ikisinden biri aktifse track kilitlidir ve branch koşulları da kilit durumunu okuyabilir.</p>
${code(`BST.LockCurrentTrack();
BST.JumpToTrack(1, crossfadeDuration: 1f, quantize: true);
BST.UnlockCurrentTrack();

int index   = BST.GetCurrentTrackIndex();
string name = BST.GetCurrentTrackName();`)}
${ex('Bir keşif state’i üç ambient track tutar. Auto-advance ve shuffle açıkken aralarında birkaç saniyeyle döner; böylece alan asla tekrara düşmez. Boss göründüğünde tracki kilitlersin ki playlist dövüş ortasında kaymasın, dövüş bitince kilidi açarsın.')}
${call('tip','Bir bölge de kilitleyebilir','<code>zoneTrackLock</code> açık bir Müzik Bölgesi, oyuncu içerideyken tracki kilitler ve çıkışta serbest bırakır - hiç kod yok.')}
<h3>Ayar referansı - playlist</h3>
${settingRows(conductorSettings.slice(20,25), 'tr')}`},

'control-panel':{
en:`<p class="lead">The Runtime Control Panel is a music laboratory. It lets you test the whole profile by hand - before any gameplay code drives the same behavior.</p>
<h3>What it does</h3>
<p>Add the panel to any GameObject and press Play. It gives you live buttons for transport, states, tracks, sections, layers, intensity, priority requests, stingers and ducking - everything in this guide, testable without writing a line of gameplay. It is the fastest way to confirm a profile is wired correctly and to audition transition timings.</p>
<h3>Tab-by-tab workflow</h3>
${settingRows([
 ['Transport','Start/stop music, choose the start state, and audition start/stop fades.','Transport','Use this first to prove the conductor and profile can play.','Önce conductor ve profilin çalabildiğini kanıtlamak için kullan.'],
 ['States','Quick state buttons plus force/persist, fade, and start track/section controls.','States','Use it to test SetMusicState timing and crossfade behavior before gameplay code exists.','Gameplay kodu yokken SetMusicState zamanlama ve crossfade davranisini test etmek icin kullan.'],
 ['Layers','Current-track layer buttons, selected-layer batches, add mode and fade overrides.','Layers','PreserveIntensity only keeps intensity ownership for layers already controlled by intensity.','PreserveIntensity sadece zaten intensity tarafından kontrol edilen layerlarda intensity sahipliğini korur.'],
 ['Tracks','Playlist jump, jump fade, lock/unlock, shuffle and auto-advance controls.','Tracks','Use for boss cues, scripted tracks, section-end crossfade tests and playlist tuning.','Boss cue, scripted track, section-end crossfade testi ve playlist ayari icin kullan.'],
 ['Sections','Current/pending section status, named jumps, valid-exit queueing and crossfade.','Sections','Use for horizontal form testing.','Yatay form testi için kullan.'],
 ['Intensity','Preset buttons, slider, quantize, smooth speed and easing controls.','Intensity','Use to hear threshold and curve rules without gameplay.','Gameplay olmadan threshold ve curve kurallarını duymak için kullan.'],
 ['Requests','Editable request slots plus active request removal and Clear Requests.','Requests','Use to model combat, low-health and cutscene arbitration.','Combat, düşük can ve cutscene arbitration modellemek için kullan.'],
 ['Events','Profile stingers, direct ducking and duck layer behavior.','Events','Use to audition accents and dialogue dips.','Vurgu ve diyalog kısmasını denemek için kullan.']
], 'en')}
<h3>Set it up</h3>
<ol class="steps">
<li><b>Add it:</b> <code>Add Component > BeatSync Toolkit > Runtime Control Panel</code> on any object in the scene.</li>
<li><b>State buttons are automatic:</b> the States tab lists every state in the active profile for you. Optionally add global layer names to <code>fallbackLayers</code> for tracks that expose no layer list.</li>
<li><b>Press Play</b> and drive the music by hand.</li>
</ol>
<p>By default it draws as a full-screen control surface, which is ideal for deep testing. The <span class="kbd">Tab</span> key shows and hides it through the legacy Input Manager.</p>
<p>When visible, the panel unlocks and shows the cursor. When hidden, <code>lockCursorWhenHidden</code> can lock and hide the cursor again, which is useful for camera-controller demos. If your own input stack owns cursor state, turn that setting off and call <code>SetVisible</code> yourself.</p>
${call('warn','Input System only projects','The Tab toggle uses the legacy Input Manager. If your project is Input System only, turn off <code>enableKeyboardToggle</code> and call <code>SetVisible(true)</code> from your own input binding.')}
${call('tip','Development only','The Runtime Control Panel is a testing tool. Remove or disable it before shipping, or gate it behind a debug flag for QA builds.')}
<h3>How panel controls map to code</h3>
${settingRows([
 ['Transport tab','Calls StartMusic and StopMusic.','StartMusic ve StopMusic çağırır.','startFadeDuration and stopFadeDuration of -1 inherit conductor defaults.','-1 startFadeDuration ve stopFadeDuration conductor varsayılanlarını miras alır.'],
 ['States tab','Calls SetMusicState with transition mode, State Fade, force, persist, start track and section options.','transition mode, State Fade, force, persist, start track ve section seçenekleriyle SetMusicState çağırır.','State Fade maps to crossfadeDuration: -1 inherits the conductor default, 0 cuts, explicit seconds test special moments.','State Fade crossfadeDuration değerine denk gelir: -1 conductor default’unu miras alır, 0 keser, açık saniye özel anları test eder.'],
 ['Layers tab','Calls AddLayer, RemoveLayer, AddLayers and ClearLayers.','AddLayer, RemoveLayer, AddLayers ve ClearLayers çağırır.','Fade overrides of -1 use layer/conductor rules.','-1 fade override layer/conductor kurallarını kullanır.'],
 ['Tracks tab','Calls JumpToTrack with the selected transition mode, Track Fade and start section option.','Seçili transition mode, Track Fade ve start section seçeneğiyle JumpToTrack çağırır.','Track Fade maps to crossfadeDuration; use OnSectionEnd plus an explicit fade to test two-phase pre-roll.','Track Fade crossfadeDuration değerine denk gelir; iki fazlı pre-roll testi için OnSectionEnd ve açık fade kullan.'],
 ['Sections tab','Calls JumpToSection or JumpToSectionByName.','JumpToSection veya JumpToSectionByName çağırır.','Queueing and crossfade controls mirror runtime API parameters.','Queue ve crossfade kontrolleri runtime API parametrelerini yansıtır.'],
 ['Intensity tab','Calls SetIntensity with quantize, smooth, smooth speed and easing options.','quantize, smooth, smooth speed ve easing seçenekleriyle SetIntensity çağırır.','When both quantize and smooth are enabled, smoothing begins on the next bar.','Quantize ve smooth birlikte açıksa smoothing sonraki barda başlar.'],
 ['Requests tab','Calls PushStateRequest, RemoveStateRequest and ClearStateRequests.','PushStateRequest, RemoveStateRequest ve ClearStateRequests çağırır.','Slots model long-lived systems such as combat and cutscenes.','Slotlar combat ve cutscene gibi uzun ömürlü sistemleri modeller.'],
 ['Events tab','Calls PlayStinger, StartDucking, StopDucking and SetDuckLayers.','PlayStinger, StartDucking, StopDucking ve SetDuckLayers çağırır.','Use for accents and dialogue mix checks.','Vurgu ve diyalog miks kontrolü için kullan.']
], 'en')}
<h3>Settings reference</h3>
${settingRows(panelSettings, 'en')}`,
tr:`<p class="lead">Runtime Control Panel bir müzik laboratuvarıdır. Tüm profili elle test etmeni sağlar - aynı davranışı herhangi bir gameplay kodu sürmeden önce.</p>
<h3>Ne yapar</h3>
<p>Paneli herhangi bir GameObject'e ekle ve Play'e bas. Transport, state, track, section, layer, intensity, öncelikli request, stinger ve ducking için canlı butonlar verir - bu rehberdeki her şey, tek satır gameplay yazmadan test edilebilir. Bir profilin doğru bağlandığını teyit etmenin ve geçiş zamanlamalarını denemenin en hızlı yolu budur.</p>
<h3>Tab tab workflow</h3>
${settingRows([
 ['Transport','Start/stop music, choose the start state, and audition start/stop fades.','Müziği başlat/durdur, start state seç ve start/stop fade dene.','Use this first to prove the conductor and profile can play.','Önce conductor ve profilin çalabildiğini kanıtlamak için kullan.'],
 ['States','Quick state buttons plus force/persist, fade, and start track/section controls.','Hızlı state butonları, force/persist, fade ve start track/section kontrolleri.','Use it to test SetMusicState timing and crossfade behavior before gameplay code exists.','Gameplay kodu yokken SetMusicState zamanlama ve crossfade davranışını test etmek için kullan.'],
 ['Layers','Current-track layer buttons, selected-layer batches, add mode and fade overrides.','Mevcut track layer butonları, seçili layer batchleri, add mode ve fade override.','PreserveIntensity only keeps intensity ownership for layers already controlled by intensity.','PreserveIntensity sadece zaten intensity tarafından kontrol edilen layerlarda intensity sahipliğini korur.'],
 ['Tracks','Playlist jump, jump fade, lock/unlock, shuffle and auto-advance controls.','Playlist jump, jump fade, lock/unlock, shuffle ve auto-advance kontrolleri.','Use for boss cues, scripted tracks, section-end crossfade tests and playlist tuning.','Boss cue, scripted track, section-end crossfade testi ve playlist ayarı için kullan.'],
 ['Sections','Current/pending section status, named jumps, valid-exit queueing and crossfade.','Mevcut/bekleyen section durumu, isimli jump, valid-exit queue ve crossfade.','Use for horizontal form testing.','Yatay form testi için kullan.'],
 ['Intensity','Preset buttons, slider, quantize, smooth speed and easing controls.','Preset butonlar, slider, quantize, smooth speed ve easing kontrolleri.','Use to hear threshold and curve rules without gameplay.','Gameplay olmadan threshold ve curve kurallarını duymak için kullan.'],
 ['Requests','Editable request slots plus active request removal and Clear Requests.','Düzenlenebilir request slotları, aktif request silme ve Clear Requests.','Use to model combat, low-health and cutscene arbitration.','Combat, düşük can ve cutscene arbitration modellemek için kullan.'],
 ['Events','Profile stingers, direct ducking and duck layer behavior.','Profil stingerları, direct ducking ve duck layer davranışı.','Use to audition accents and dialogue dips.','Vurgu ve diyalog kısmasını denemek için kullan.']
], 'tr')}
<h3>Kur</h3>
<ol class="steps">
<li><b>Ekle:</b> sahnedeki herhangi bir objeye <code>Add Component > BeatSync Toolkit > Runtime Control Panel</code>.</li>
<li><b>State butonları otomatik:</b> States tabı aktif profildeki tüm state'leri kendiliğinden listeler. İstersen layer listesi sunmayan track'ler için global layer adlarını <code>fallbackLayers</code>'a ekleyebilirsin.</li>
<li><b>Play'e bas</b> ve müziği elle sür.</li>
</ol>
<p>Varsayılan olarak tam ekran bir kontrol yüzeyi olarak çizilir; bu derin test için idealdir. <span class="kbd">Tab</span> tuşu onu eski Input Manager üzerinden gösterip gizler.</p>
<p>Panel görünürken cursoru unlock eder ve gösterir. Gizliyken <code>lockCursorWhenHidden</code> cursoru yeniden kilitleyip gizleyebilir; bu kamera-controller demoları için kullanışlıdır. Kendi input stack'in cursor durumunu yönetiyorsa bu ayarı kapat ve <code>SetVisible</code> çağrısını kendin yap.</p>
${call('warn','Yalnızca Input System projeleri','Tab toggle eski Input Manager kullanır. Projen yalnızca Input System ise <code>enableKeyboardToggle</code>’ı kapat ve kendi input binding’inden <code>SetVisible(true)</code> çağır.')}
${call('tip','Yalnızca geliştirme','Runtime Control Panel bir test aracıdır. Yayından önce kaldır veya devre dışı bırak, ya da QA build’leri için bir debug bayrağının arkasına al.')}
<h3>Panel kontrolleri koda nasıl denk gelir</h3>
${settingRows([
 ['Transport tab','Calls StartMusic and StopMusic.','StartMusic ve StopMusic çağırır.','startFadeDuration and stopFadeDuration of -1 inherit conductor defaults.','-1 startFadeDuration ve stopFadeDuration conductor varsayılanlarını miras alır.'],
 ['States tab','Calls SetMusicState with transition mode, State Fade, force, persist, start track and section options.','transition mode, State Fade, force, persist, start track ve section seçenekleriyle SetMusicState çağırır.','State Fade maps to crossfadeDuration: -1 inherits the conductor default, 0 cuts, explicit seconds test special moments.','State Fade crossfadeDuration değerine denk gelir: -1 conductor default’unu miras alır, 0 keser, açık saniye özel anları test eder.'],
 ['Layers tab','Calls AddLayer, RemoveLayer, AddLayers and ClearLayers.','AddLayer, RemoveLayer, AddLayers ve ClearLayers çağırır.','Fade overrides of -1 use layer/conductor rules.','-1 fade override layer/conductor kurallarını kullanır.'],
 ['Tracks tab','Calls JumpToTrack with the selected transition mode, Track Fade and start section option.','Seçili transition mode, Track Fade ve start section seçeneğiyle JumpToTrack çağırır.','Track Fade maps to crossfadeDuration; use OnSectionEnd plus an explicit fade to test two-phase pre-roll.','Track Fade crossfadeDuration değerine denk gelir; iki fazlı pre-roll testi için OnSectionEnd ve açık fade kullan.'],
 ['Sections tab','Calls JumpToSection or JumpToSectionByName.','JumpToSection veya JumpToSectionByName çağırır.','Queueing and crossfade controls mirror runtime API parameters.','Queue ve crossfade kontrolleri runtime API parametrelerini yansıtır.'],
 ['Intensity tab','Calls SetIntensity with quantize, smooth, smooth speed and easing options.','quantize, smooth, smooth speed ve easing seçenekleriyle SetIntensity çağırır.','When both quantize and smooth are enabled, smoothing begins on the next bar.','Quantize ve smooth birlikte açıksa smoothing sonraki barda başlar.'],
 ['Requests tab','Calls PushStateRequest, RemoveStateRequest and ClearStateRequests.','PushStateRequest, RemoveStateRequest ve ClearStateRequests çağırır.','Slots model long-lived systems such as combat and cutscenes.','Slotlar combat ve cutscene gibi uzun ömürlü sistemleri modeller.'],
 ['Events tab','Calls PlayStinger, StartDucking, StopDucking and SetDuckLayers.','PlayStinger, StartDucking, StopDucking ve SetDuckLayers çağırır.','Use for accents and dialogue mix checks.','Vurgu ve diyalog miks kontrolü için kullan.']
], 'tr')}
<h3>Ayar referansı</h3>
${settingRows(panelSettings, 'tr')}`},

'recipes':{
en:`<p class="lead">Real projects combine systems. These recipes show how a few BST calls plus a profile produce a complete reactive moment.</p>
<h3>Explore to Combat on the beat</h3>
${code(`void EnterCombat() => BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar);
void ExitCombat()  => BST.SetMusicState("Explore", BSTTransitionMode.OnNextBar);`)}
<h3>Continuous intensity from threat</h3>
${code(`void Update()
{
    float t = Mathf.Clamp01(threatLevel / maxThreat);
    BST.SetIntensity(t, quantize: true, smooth: true);
}`)}
<h3>Low-health tension that overrides combat</h3>
${code(`void OnHealthChanged(float hp01)
{
    if (hp01 < 0.25f) BST.PushStateRequest("low_health", "Tension", priority: 50);
    else              BST.RemoveStateRequest("low_health");
}`)}
<h3>Boss that escalates by phase</h3>
${code(`void StartBoss()    => BST.SetMusicState("Boss", BSTTransitionMode.OnNextBar);
void EnterPhase2()  => BST.SetCustomFlag("BossPhase2", true);   // a branch routes to Phase2
void BossDefeated() => BST.JumpToSectionByName("Outro");`)}
<h3>Dialogue ducking with an accent</h3>
${code(`void OnDialogueStart()
{
    BST.StartDucking(targetVolume: 0.25f, fadeTime: 0.4f);
    BST.PlayStinger("Reveal");
}
void OnDialogueEnd() => BST.StopDucking(fadeTime: 0.8f);`)}
<h3>Menu to gameplay on a hard cut</h3>
${code(`void StartGame() => BST.SetMusicStateImmediate("Explore", crossfadeDuration: 0.5f);
void OpenMenu()  => BST.SetMusicStateImmediate("Menu",    crossfadeDuration: 0.5f);`)}
<h3>Victory and defeat stingers</h3>
${code(`void OnWin()  { BST.PlayStinger("Victory"); BST.StopMusic(fadeDuration: 1.5f); }
void OnDie()  { BST.PlayStinger("Defeat");  BST.SetMusicStateImmediate("GameOver"); }`)}
<h3>Crossfade between two exploration tracks</h3>
${code(`// Same state, different song. Jump on the next bar with a 2s crossfade.
void NextExploreTrack() => BST.JumpToTrack(1, crossfadeDuration: 2f, quantize: true);`)}
<h3>End a boss cleanly on its Outro section</h3>
${code(`// Let the current phrase finish, then route to the authored Outro section.
void BossDefeated() => BST.JumpToSectionByName("Outro", quantize: true);`)}
<h3>Pause menu that dips the music</h3>
${code(`void OnPause()  => BST.StartDucking(targetVolume: 0.4f, fadeTime: 0.2f);
void OnResume() => BST.StopDucking(fadeTime: 0.2f);`)}
<h3>A complete drop-in example</h3>
<p>One small component that wires a few gameplay calls into music. Drop it on any object, call its methods from your gameplay events, and you have a working reactive score.</p>
${code(`using UnityEngine;
using Nonfigure.BeatSyncToolkit;

public class SimpleMusicDirector : MonoBehaviour
{
    void Start() => BST.StartMusic("Explore", fadeDuration: 1f);

    public void EnterCombat()
    {
        BST.PushStateRequest("combat", "Combat", priority: 20);
        BST.AddLayer("Drums");
    }

    public void LeaveCombat()
    {
        BST.RemoveStateRequest("combat");
        BST.RemoveLayer("Drums");
    }

    public void SetThreat(float value01) =>
        BST.SetIntensity(value01, quantize: true, smooth: true);

    public void Victory()
    {
        BST.PlayStinger("Victory");
        BST.SetMusicState("Explore", BSTTransitionMode.OnSectionEnd);
    }
}`)}
${cards([
 ['Stealth suspicion','Explore stays active, intensity follows a 0-1 suspicion value, and a custom flag branches sections to an Alert phrase when the player is spotted.','Explore aktif kalır, intensity 0-1 şüphe değerini izler ve oyuncu görülünce bir custom flag sectionları bir Alert cümlesine dallandırır.'],
 ['Combat arena','A zone selects Combat, intensity follows enemy count, stingers mark each wave, and ducking clears space for announcer lines.','Bir bölge Combat seçer, intensity düşman sayısını izler, stingerlar her wave’i işaretler ve ducking anons satırlarına yer açar.'],
 ['Puzzle progress','One calm state gains layers as progress rises, then plays a Victory stinger the moment it is solved.','Tek bir sakin state ilerleme arttıkça layer kazanır, çözüldüğü an bir Victory stingerı çalar.'],
 ['Safe town','A Music Zone with zoneState Calm covers the town. Walk in and music eases to Calm; walk out and your previous music is restored automatically.','zoneState’i Calm olan bir Müzik Bölgesi kasabayı kaplar. Girince müzik Calm’e geçer; çıkınca önceki müziğin otomatik geri yüklenir.']
], 'en')}
<h3>Recipe selection guide</h3>
${settingRows([
 ['Use a state','The whole musical mood changes.','Bütün müzikal mod değişir.','Explore, Combat, Boss, Menu and Calm are states.','Explore, Combat, Boss, Menu ve Calm state olur.'],
 ['Use intensity','The same mood gets more or less energetic.','Aynı mod daha az veya daha çok enerjik olur.','Threat, suspicion, crowd noise and puzzle progress are intensity.','Tehdit, şüphe, kalabalık ve puzzle ilerleme intensity olur.'],
 ['Use sections','A cue has authored phrases or phases.','Cue yazılmış cümle veya faz taşır.','Intro, Loop, Phase2 and Outro are sections.','Intro, Loop, Phase2 ve Outro section olur.'],
 ['Use requests','Several systems may want music at once.','Birden fazla sistem aynı anda müzik isteyebilir.','Combat, low health and cutscene should be requests.','Combat, düşük can ve cutscene request olmalı.'],
 ['Use zones','A place in the world should own music.','Dünyadaki bir yer müziği sahiplenmeli.','Town, cave, arena and shrine are zones.','Kasaba, mağara, arena ve tapınak zone olur.']
], 'en')}
${call('tip','They stack','A zone can set the state while intensity drives layers and a request handles the rare cutscene. Arbitration keeps them from fighting, so you can layer recipes freely.')}`,
tr:`<p class="lead">Gerçek projeler sistemleri birleştirir. Bu tarifler, birkaç BST çağrısı ve bir profilin nasıl eksiksiz bir tepkili an ürettiğini gösterir.</p>
<h3>Vuruşta Explore'dan Combata</h3>
${code(`void EnterCombat() => BST.SetMusicState("Combat", BSTTransitionMode.OnNextBar);
void ExitCombat()  => BST.SetMusicState("Explore", BSTTransitionMode.OnNextBar);`)}
<h3>Tehditten sürekli intensity</h3>
${code(`void Update()
{
    float t = Mathf.Clamp01(threatLevel / maxThreat);
    BST.SetIntensity(t, quantize: true, smooth: true);
}`)}
<h3>Combatı ezen düşük-can gerilimi</h3>
${code(`void OnHealthChanged(float hp01)
{
    if (hp01 < 0.25f) BST.PushStateRequest("low_health", "Tension", priority: 50);
    else              BST.RemoveStateRequest("low_health");
}`)}
<h3>Faza göre tırmanan boss</h3>
${code(`void StartBoss()    => BST.SetMusicState("Boss", BSTTransitionMode.OnNextBar);
void EnterPhase2()  => BST.SetCustomFlag("BossPhase2", true);   // bir branch Phase2'ye yönlendirir
void BossDefeated() => BST.JumpToSectionByName("Outro");`)}
<h3>Vurgulu diyalog ducking</h3>
${code(`void OnDialogueStart()
{
    BST.StartDucking(targetVolume: 0.25f, fadeTime: 0.4f);
    BST.PlayStinger("Reveal");
}
void OnDialogueEnd() => BST.StopDucking(fadeTime: 0.8f);`)}
<h3>Sert kesitle menüden oyuna</h3>
${code(`void StartGame() => BST.SetMusicStateImmediate("Explore", crossfadeDuration: 0.5f);
void OpenMenu()  => BST.SetMusicStateImmediate("Menu",    crossfadeDuration: 0.5f);`)}
<h3>Zafer ve yenilgi stingerları</h3>
${code(`void OnWin()  { BST.PlayStinger("Victory"); BST.StopMusic(fadeDuration: 1.5f); }
void OnDie()  { BST.PlayStinger("Defeat");  BST.SetMusicStateImmediate("GameOver"); }`)}
<h3>İki keşif tracki arasında crossfade</h3>
${code(`// Aynı state, farklı şarkı. Sonraki barda 2sn crossfade ile atla.
void NextExploreTrack() => BST.JumpToTrack(1, crossfadeDuration: 2f, quantize: true);`)}
<h3>Boss'u Outro section'ında temizce bitir</h3>
${code(`// Mevcut cümle bitsin, sonra yazılmış Outro section'ına yönlendir.
void BossDefeated() => BST.JumpToSectionByName("Outro", quantize: true);`)}
<h3>Müziği kısan duraklatma menüsü</h3>
${code(`void OnPause()  => BST.StartDucking(targetVolume: 0.4f, fadeTime: 0.2f);
void OnResume() => BST.StopDucking(fadeTime: 0.2f);`)}
<h3>Tam, hazır bir örnek</h3>
<p>Birkaç gameplay çağrısını müziğe bağlayan tek küçük bir bileşen. Herhangi bir objeye ekle, metotlarını gameplay olaylarından çağır ve çalışan bir tepkili skorun olsun.</p>
${code(`using UnityEngine;
using Nonfigure.BeatSyncToolkit;

public class SimpleMusicDirector : MonoBehaviour
{
    void Start() => BST.StartMusic("Explore", fadeDuration: 1f);

    public void EnterCombat()
    {
        BST.PushStateRequest("combat", "Combat", priority: 20);
        BST.AddLayer("Drums");
    }

    public void LeaveCombat()
    {
        BST.RemoveStateRequest("combat");
        BST.RemoveLayer("Drums");
    }

    public void SetThreat(float value01) =>
        BST.SetIntensity(value01, quantize: true, smooth: true);

    public void Victory()
    {
        BST.PlayStinger("Victory");
        BST.SetMusicState("Explore", BSTTransitionMode.OnSectionEnd);
    }
}`)}
${cards([
 ['Stealth şüphesi','Explore aktif kalır, intensity 0-1 şüphe değerini izler ve oyuncu görülünce bir custom flag sectionları bir Alert cümlesine dallandırır.','Explore aktif kalır, intensity 0-1 şüphe değerini izler ve oyuncu görülünce bir custom flag sectionları bir Alert cümlesine dallandırır.'],
 ['Combat arenası','Bir bölge Combat seçer, intensity düşman sayısını izler, stingerlar her wave’i işaretler ve ducking anons satırlarına yer açar.','Bir bölge Combat seçer, intensity düşman sayısını izler, stingerlar her wave’i işaretler ve ducking anons satırlarına yer açar.'],
 ['Puzzle ilerlemesi','Tek bir sakin state ilerleme arttıkça layer kazanır, çözüldüğü an bir Victory stingerı çalar.','Tek bir sakin state ilerleme arttıkça layer kazanır, çözüldüğü an bir Victory stingerı çalar.'],
 ['Güvenli kasaba','zoneState’i Calm olan bir Müzik Bölgesi kasabayı kaplar. Girince müzik Calm’e geçer; çıkınca önceki müziğin otomatik geri yüklenir.','zoneState’i Calm olan bir Müzik Bölgesi kasabayı kaplar. Girince müzik Calm’e geçer; çıkınca önceki müziğin otomatik geri yüklenir.']
], 'tr')}
<h3>Tarif seçme rehberi</h3>
${settingRows([
 ['Use a state','The whole musical mood changes.','Bütün müzikal mod değişir.','Explore, Combat, Boss, Menu and Calm are states.','Explore, Combat, Boss, Menu ve Calm state olur.'],
 ['Use intensity','The same mood gets more or less energetic.','Aynı mod daha az veya daha çok enerjik olur.','Threat, suspicion, crowd noise and puzzle progress are intensity.','Tehdit, şüphe, kalabalık ve puzzle ilerleme intensity olur.'],
 ['Use sections','A cue has authored phrases or phases.','Cue yazılmış cümle veya faz taşır.','Intro, Loop, Phase2 and Outro are sections.','Intro, Loop, Phase2 ve Outro section olur.'],
 ['Use requests','Several systems may want music at once.','Birden fazla sistem aynı anda müzik isteyebilir.','Combat, low health and cutscene should be requests.','Combat, düşük can ve cutscene request olmalı.'],
 ['Use zones','A place in the world should own music.','Dünyadaki bir yer müziği sahiplenmeli.','Town, cave, arena and shrine are zones.','Kasaba, mağara, arena ve tapınak zone olur.']
], 'tr')}
${call('tip','Üst üste binerler','Bir bölge state’i ayarlarken intensity layerları sürebilir ve bir request nadir cutscene’i yönetebilir. Önceliklendirme çatışmayı önler; tarifleri serbestçe katmanlayabilirsin.')}`},
'troubleshooting':{
en:`<p class="lead">When something is silent or behaves oddly, it is almost always one of a handful of causes. Debug from the outside in: scene, then profile, then names, then timing, then ownership.</p>
<h3>The five-minute checklist</h3>
<p>Turn on the Conductor <code>debugLog</code> first - it usually prints the exact reason a call was ignored. Then walk the table below from the top; the most common problems are at the start.</p>
${tbl(['Problem','Likely cause','Fix'],[
 ['No sound at all','No Conductor or profile, no active AudioListener, an empty clip, or music never started.','Confirm one active Conductor with a profile, one AudioListener, an assigned clip, and that StartMusic or autoStartState ran.'],
 ['State does not change','A name typo, a zone is winning, a higher-priority request is winning, or the target track/section is invalid.','Copy the exact state name, check active zones and requests, and read the debugLog message.'],
 ['A layer never plays','The layer is missing on the current track, the name is mistyped, it has no clip, or intensity owns it.','Call GetAvailableLayers, verify the clip, and check the addMode you used.'],
 ['A section never branches','No valid exit is reached, no branch conditions pass, or the target index is invalid.','Check useBarExitPoints and validExitBars, branch priority, and add an Always fallback.'],
 ['A zone never triggers','The collider is not a trigger, the tag does not match, a Rigidbody is missing, or a higher-priority zone wins.','Confirm BoxCollider is a trigger, check localPlayerTag, add a Rigidbody, and review zonePriority.'],
 ['A stinger does not play','The cue name does not match, or the cue has no clip.','Use GetAvailableStingerCueNames and confirm the cue clip is assigned.'],
 ['Timing feels wrong','BPM, beats per bar, or stem export do not match.','Verify the tempo and export every stem from the identical start and end.'],
 ['Two songs overlap','Two active Conductors.','Disable the older Conductor; keep exactly one.']
])}
<h3>Authoring validation report</h3>
<p>Before packaging or wiring a profile into gameplay, open <code>Tools > BeatSync Toolkit > Validate Project</code>. The report scans profiles, conductors, zones and intensity profiles. Errors can stop playback or make a target unreachable. Warnings are likely authoring mistakes that may still be intentional.</p>
${tbl(['Warning','Meaning','Fix'],[
 ['Stem sync mismatch','A layer clip does not closely match the active base or section bed length.','Export every stem from the same DAW start and end as the bed.'],
 ['Section is not whole-bar length','The section clip length does not line up with BPM and beats per bar.','Export to a whole number of bars, or use validExitBars for intentional early exits.'],
 ['Invalid validExitBars','A bar number is below 1, duplicated, or starts outside the section clip.','Use 1-based local bar starts: 5 means the start of bar five inside that section.'],
 ['Unknown zone or intensity layer','A rule references a layer name no matching track exposes.','Check spelling and make sure the target track defines the layer.']
])}
${call('tip','Most issues are names or ownership','If a call seems ignored, it is usually a mistyped name or a zone/request that outranks you. The debugLog will name the winner.')}`,
tr:`<p class="lead">Bir şey sessizse veya tuhaf davranıyorsa neredeyse her zaman birkaç nedenden biridir. Dıştan içe debug et: sahne, sonra profil, sonra isimler, sonra zamanlama, sonra sahiplik.</p>
<h3>Beş dakikalık kontrol listesi</h3>
<p>Önce Conductor <code>debugLog</code>'unu aç - bir çağrının neden yok sayıldığını genelde tam olarak yazar. Sonra aşağıdaki tabloyu yukarıdan aşağı yürü; en sık sorunlar başta.</p>
${tbl(['Sorun','Muhtemel neden','Çözüm'],[
 ['Hiç ses yok','Conductor veya profil yok, aktif AudioListener yok, boş clip ya da müzik hiç başlamadı.','Profilli tek aktif Conductor, bir AudioListener, atanmış clip ve StartMusic/autoStartState çalıştığını doğrula.'],
 ['State değişmiyor','İsim hatası, bir bölge kazanıyor, daha yüksek öncelikli request kazanıyor ya da hedef track/section geçersiz.','Exact state adını kopyala, aktif bölge ve requestleri kontrol et, debugLog mesajını oku.'],
 ['Bir layer hiç çalmıyor','Layer mevcut trackte yok, isim hatalı, clip yok ya da intensity sahibi.','GetAvailableLayers çağır, clip’i doğrula ve kullandığın addMode’u kontrol et.'],
 ['Bir section hiç dallanmıyor','Geçerli çıkışa ulaşılmıyor, hiçbir branch koşulu geçmiyor ya da hedef index geçersiz.','useBarExitPoints ve validExitBars, branch priority kontrol et ve bir Always fallback ekle.'],
 ['Bir bölge hiç tetiklenmiyor','Collider trigger değil, tag eşleşmiyor, Rigidbody yok ya da daha yüksek öncelikli bölge kazanıyor.','BoxCollider trigger mı doğrula, localPlayerTag kontrol et, Rigidbody ekle ve zonePriority gözden geçir.'],
 ['Bir stinger çalmıyor','Cue adı eşleşmiyor ya da cue’nun clip’i yok.','GetAvailableStingerCueNames kullan ve cue clip’inin atandığını doğrula.'],
 ['Zamanlama yanlış hissediyor','BPM, beats per bar veya stem export uyuşmuyor.','Tempoyu doğrula ve her stemi birebir aynı başlangıç ve bitişten export et.'],
 ['İki şarkı üst üste biniyor','İki aktif Conductor.','Eski Conductor’u devre dışı bırak; tam olarak bir tane tut.']
])}
<h3>Authoring validation raporu</h3>
<p>Profilini paketlemeden veya gameplaye bağlamadan önce Unity menüsünden <code>Tools > BeatSync Toolkit > Validate Project</code> raporunu aç. Rapor profilleri, conductorleri, zoneları ve intensity profillerini tarar. Error seviyeleri playbacki durdurabilecek veya hedefi ulaşılamaz yapabilecek hatalardır. Warning seviyeleri genelde authoring hatasıdır ama bazen bilinçli tercih olabilir.</p>
${tbl(['Uyarı','Anlam','Çözüm'],[
 ['Stem sync mismatch','Bir layer clipi aktif base veya section bed uzunluğuyla yeterince eşleşmiyor.','Her stemi DAW içinde bed ile aynı başlangıç ve bitişten export et.'],
 ['Section whole-bar uzunlukta değil','Section clip uzunluğu BPM ve beats per bar ile tam bar sınırına oturmuyor.','Clipi tam bar sayısına export et veya bilinçli erken çıkış için validExitBars kullan.'],
 ['Geçersiz validExitBars','Bar numarası 1den küçük, tekrarlı veya section clip dışında başlıyor.','1 tabanlı lokal bar başlangıçları kullan: 5, o section içindeki beşinci barın başıdır.'],
 ['Bilinmeyen zone veya intensity layer','Bir kural, hedef tracklerde bulunmayan layer adına referans veriyor.','Yazımı kontrol et ve hedef trackin bu layerı tanımladığından emin ol.']
])}
${call('tip','Çoğu sorun isim ya da sahipliktir','Bir çağrı yok sayılıyor gibiyse, genelde yanlış yazılmış bir isim ya da seni geçen bir bölge/requesttir. debugLog kazananı söyler.')}`},

'pipelines':{
en:`<p class="lead">The audio engine is render-pipeline independent. Performance depends mostly on clip import, warmup, scheduling and how stems are prepared.</p>
<h3>Render pipelines</h3>
<p>BeatSyncToolkit behaves identically in Built-in, URP and HDRP, because none of the music logic touches rendering. Only the demo art and the zone preview box are visual, and the preview box uses a cross-pipeline material so it renders correctly everywhere.</p>
<h3>Performance levers</h3>
<p>The Conductor performance group exists to keep the first reaction smooth without blocking scene start. Warmup spreads audio loading over several frames, and prepared muted layers keep later layer enables sample-synced. Tune them up if you have a large profile, or down to spread cost.</p>
${call('note','Audio import settings','Set looping music to streaming or compressed-in-memory as appropriate, and short stingers and stems to Decompress On Load. These live in Unity AudioClip import settings, independent of the toolkit.')}
<h3>Editor and Fast Enter Play Mode</h3>
<p>The toolkit is safe with Fast Enter Play Mode, including Unity 6.6 and later where domain reload is off by default. Runtime state resets cleanly when play mode ends: the manager singleton clears itself and nothing relies on static fields surviving between play sessions. You can leave Reload Domain off for fast iteration without breaking the music system.</p>
<h3>Settings reference</h3>
${settingRows([
 ['Fast Enter Play Mode','Safe with domain reload off, including the Unity 6.6+ default.','Domain reload kapalıyken güvenli, Unity 6.6+ varsayılanı dahil.','No static state carries between play sessions, so you can iterate fast.','Static state play sessionları arası taşınmaz, hızlı yineleyebilirsin.'],
 ['Unity 2022.3+','Supported baseline.','Desteklenen temel sürüm.','Use a newer LTS if your project already uses it.','Projen kullanıyorsa daha yeni bir LTS kullanabilirsin.'],
 ['Built-in / URP / HDRP','Audio behavior is pipeline independent.','Ses davranışı pipeline bağımsızdır.','Only visuals and materials are pipeline-specific.','Sadece görseller ve materyaller pipelinea özeldir.'],
 ['Preload / warmup','Reduces first-play hitches.','İlk çalma takılmasını azaltır.','Tune with profileWarmupItemsPerFrame.','profileWarmupItemsPerFrame ile ayarla.'],
 ['Prepared muted layers','Keeps later layer enables sample-synced.','Sonradan açılan layerları sample-senkron tutar.','Keep on for stem music.','Stemli müzikte açık tut.'],
 ['Validate before shipping','Run Tools > BeatSync Toolkit > Validate Project, then audition every moment in Play Mode.','Tools > BeatSync Toolkit > Validate Project çalıştır, sonra her anı Play Mode\'da dene.','The Runtime Control Panel walks the whole checklist fastest.','Tüm kontrol listesini en hızlı Runtime Control Panel yürür.']
], 'en')}`,
tr:`<p class="lead">Ses motoru render pipeline bağımsızdır. Performans çoğunlukla clip import, warmup, scheduling ve stemlerin nasıl hazırlandığına bağlıdır.</p>
<h3>Render pipelinelar</h3>
<p>BeatSyncToolkit Built-in, URP ve HDRP'de aynı davranır çünkü müzik mantığının hiçbiri render'a dokunmaz. Yalnızca demo görseli ve bölge önizleme kutusu görseldir; önizleme kutusu her yerde doğru render olsun diye pipeline-bağımsız bir materyal kullanır.</p>
<h3>Performans kolları</h3>
<p>Conductor performans grubu, sahne başlangıcını bloklamadan ilk tepkiyi pürüzsüz tutmak içindir. Warmup ses yüklemeyi birkaç kareye yayar; hazırlanmış sessiz layerlar sonradan açılan layerları sample-senkron tutar. Büyük bir profilin varsa yukarı, maliyeti yaymak için aşağı ayarla.</p>
${call('note','Ses import ayarları','Loop müziği uygun şekilde streaming veya compressed-in-memory yap, kısa stinger ve stemleri Decompress On Load yap. Bunlar toolkit’ten bağımsız olarak Unity AudioClip import ayarlarındadır.')}
<h3>Editör ve Fast Enter Play Mode</h3>
<p>Toolkit Fast Enter Play Mode ile güvenlidir; domain reload'ın varsayılan kapalı olduğu Unity 6.6 ve sonrası dahil. Play mode bitince tüm runtime durumu temiz sıfırlanır: manager singleton kendini temizler ve hiçbir şey static alanların play session'ları arası kalmasına dayanmaz. Hızlı yineleme için Reload Domain'i kapalı bırakabilirsin, müzik sistemi bozulmaz.</p>
<h3>Ayar referansı</h3>
${settingRows([
 ['Fast Enter Play Mode','Safe with domain reload off, including the Unity 6.6+ default.','Domain reload kapalıyken güvenli, Unity 6.6+ varsayılanı dahil.','No static state carries between play sessions, so you can iterate fast.','Static state play sessionları arası taşınmaz, hızlı yineleyebilirsin.'],
 ['Unity 2022.3+','Supported baseline.','Desteklenen temel sürüm.','Use a newer LTS if your project already uses it.','Projen kullanıyorsa daha yeni bir LTS kullanabilirsin.'],
 ['Built-in / URP / HDRP','Audio behavior is pipeline independent.','Ses davranışı pipeline bağımsızdır.','Only visuals and materials are pipeline-specific.','Sadece görseller ve materyaller pipelinea özeldir.'],
 ['Preload / warmup','Reduces first-play hitches.','İlk çalma takılmasını azaltır.','Tune with profileWarmupItemsPerFrame.','profileWarmupItemsPerFrame ile ayarla.'],
 ['Prepared muted layers','Keeps later layer enables sample-synced.','Sonradan açılan layerları sample-senkron tutar.','Keep on for stem music.','Stemli müzikte açık tut.'],
 ['Validate before shipping','Run Tools > BeatSync Toolkit > Validate Project, then audition every moment in Play Mode.','Tools > BeatSync Toolkit > Validate Project çalıştır, sonra her anı Play Mode\'da dene.','The Runtime Control Panel walks the whole checklist fastest.','Tüm kontrol listesini en hızlı Runtime Control Panel yürür.']
], 'tr')}`},

'api-reference':{
en:`<p class="lead">The complete public BST API, grouped by use. These names are verified against <code>BST.cs</code>; for teaching examples see the Gameplay API page.</p>
<h3>How to read this</h3>
<p>Every call here is static on <code>BST</code> and routes through the active Conductor. Setters generally take a <code>quantize</code> flag or transition mode; getters are always safe to call, even before playback.</p>
<h3>Complete call reference</h3>
${settingRows(apiReferenceRows, 'en')}
<h3>State parameter reference</h3>
${settingRows(stateParameterRows, 'en')}
<h3>Fallback return values</h3>
${settingRows(getterDefaultRows, 'en')}
<h3>Direct conductor events and advanced status</h3>
${settingRows(conductorEventRows, 'en')}
<h3>Usage patterns</h3>
${code(`// Guard optional UI against missing setup.
if (BST.HasConductor() && BST.IsPlaying())
{
    Debug.Log($"{BST.GetMusicStateName()} bar {BST.GetCurrentBar()} beat {BST.GetCurrentBeat()}");
}

// Prefer Try* when the caller can recover or show an authoring error.
if (!BST.TrySetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f))
{
    Debug.LogWarning("Combat state is not available in the active profile.");
}`)}
${call('note','Getter fallbacks are intentional','List getters return empty lists, string getters return empty strings when unavailable, numeric timing getters return 0, and index getters return -1. This keeps runtime UI simple, but gameplay should still check <code>IsPlaying</code> when 0 or -1 has meaning.')}
<h3>Short group index</h3>
${settingRows([
 ['GetConductor, HasConductor, IsPlaying','Setup and status.','Kurulum ve durum.','Check readiness and playback state.','Hazır olma ve playback durumunu kontrol et.'],
 ['StartMusic, StopMusic','Transport.','Transport.','Start or stop the score.','Skoru başlat veya durdur.'],
 ['SetMusicState, TrySetMusicState, SetMusicStateImmediate, SetMusicStateQuantized, GetMusicStateName','State control.','State kontrolü.','Switch and query game moods.','Oyun modlarını değiştir ve sorgula.'],
 ['AddLayer, AddLayers, RemoveLayer, ClearLayers, IsLayerActive, GetAvailableLayers, GetActiveLayers, TryGetLayerFadeDurations','Layer control.','Layer kontrolü.','Manage stems.','Stemleri yönet.'],
 ['LockCurrentTrack, UnlockCurrentTrack, IsTrackLocked, JumpToTrack, GetCurrentTrackIndex, GetCurrentTrackName, GetCurrentStateTrackNames','Track control.','Track kontrolü.','Manage playlists and track selection.','Playlist ve track seçimini yönet.'],
 ['JumpToSection, JumpToSectionByName, GetCurrentSectionNames, GetCurrentSectionInfo, GetCurrentSectionIndex, GetCurrentSectionBar, GetCurrentSectionName, GetSectionLoopCount, HasPendingSectionTransition, GetPendingSectionIndex, IsSectionSystemActive','Section control.','Section kontrolü.','Manage horizontal form.','Yatay formu yönet.'],
 ['PushStateRequest, TryPushStateRequest, RemoveStateRequest, ClearStateRequests, GetActiveStateRequests','Requests.','Requestler.','Resolve competing music intents.','Çakışan müzik niyetlerini çöz.'],
 ['SetCustomFlag, GetCustomFlag, ClearCustomFlags, SetIntensity, GetIntensity','Flags and intensity.','Flag ve intensity.','Drive branches and layer rules.','Branch ve layer kurallarını sür.'],
 ['PlayStinger, GetAvailableStingerCueNames, StartDucking, StopDucking, SetDuckLayers, GetDuckLayers','Accents and ducking.','Vurgu ve ducking.','Handle moments and dialogue clarity.','Anlık olayları ve diyalog netliğini yönet.'],
 ['GetBpm, GetCurrentBar, GetCurrentBeat','Timing getters.','Zaman getterları.','Sync UI or gameplay to the musical grid.','UI veya gameplayi müzikal gride bağla.']
], 'en')}`,
tr:`<p class="lead">Kullanıma göre gruplanmış tam public BST API. Bu isimler <code>BST.cs</code> ile doğrulanmıştır; öğretici örnekler için Oyun API sayfasına bak.</p>
<h3>Bu nasıl okunur</h3>
<p>Buradaki her çağrı <code>BST</code> üzerinde statiktir ve aktif Conductor üzerinden gider. Setterlar genelde bir <code>quantize</code> bayrağı veya transition modu alır; getterlar playback öncesi bile her zaman güvenle çağrılabilir.</p>
<h3>Tam çağrı referansı</h3>
${settingRows(apiReferenceRows, 'tr')}
<h3>State parametre referansı</h3>
${settingRows(stateParameterRows, 'tr')}
<h3>Fallback dönüş değerleri</h3>
${settingRows(getterDefaultRows, 'tr')}
<h3>Direct conductor eventleri ve ileri durum</h3>
${settingRows(conductorEventRows, 'tr')}
<h3>Kullanım kalıpları</h3>
${code(`// Opsiyonel UI'ı eksik kuruluma karşı koru.
if (BST.HasConductor() && BST.IsPlaying())
{
    Debug.Log($"{BST.GetMusicStateName()} bar {BST.GetCurrentBar()} beat {BST.GetCurrentBeat()}");
}

// Çağıran taraf toparlanabilecekse veya authoring hatası gösterecekse Try* tercih et.
if (!BST.TrySetMusicState("Combat", BSTTransitionMode.OnNextBar, crossfadeDuration: 0.35f))
{
    Debug.LogWarning("Combat state is not available in the active profile.");
}`)}
${call('note','Getter fallbackları bilinçlidir','Liste getterları boş liste, string getterları yoksa boş string, numeric timing getterları 0 ve index getterları -1 döndürür. Bu runtime UI yapmayı kolaylaştırır; ama 0 veya -1 gameplayde anlamlıysa yine <code>IsPlaying</code> kontrol et.')}
<h3>Kısa grup indeksi</h3>
${settingRows([
 ['GetConductor, HasConductor, IsPlaying','Setup and status.','Kurulum ve durum.','Check readiness and playback state.','Hazır olma ve playback durumunu kontrol et.'],
 ['StartMusic, StopMusic','Transport.','Transport.','Start or stop the score.','Skoru başlat veya durdur.'],
 ['SetMusicState, TrySetMusicState, SetMusicStateImmediate, SetMusicStateQuantized, GetMusicStateName','State control.','State kontrolü.','Switch and query game moods.','Oyun modlarını değiştir ve sorgula.'],
 ['AddLayer, AddLayers, RemoveLayer, ClearLayers, IsLayerActive, GetAvailableLayers, GetActiveLayers, TryGetLayerFadeDurations','Layer control.','Layer kontrolü.','Manage stems.','Stemleri yönet.'],
 ['LockCurrentTrack, UnlockCurrentTrack, IsTrackLocked, JumpToTrack, GetCurrentTrackIndex, GetCurrentTrackName, GetCurrentStateTrackNames','Track control.','Track kontrolü.','Manage playlists and track selection.','Playlist ve track seçimini yönet.'],
 ['JumpToSection, JumpToSectionByName, GetCurrentSectionNames, GetCurrentSectionInfo, GetCurrentSectionIndex, GetCurrentSectionBar, GetCurrentSectionName, GetSectionLoopCount, HasPendingSectionTransition, GetPendingSectionIndex, IsSectionSystemActive','Section control.','Section kontrolü.','Manage horizontal form.','Yatay formu yönet.'],
 ['PushStateRequest, TryPushStateRequest, RemoveStateRequest, ClearStateRequests, GetActiveStateRequests','Requests.','Requestler.','Resolve competing music intents.','Çakışan müzik niyetlerini çöz.'],
 ['SetCustomFlag, GetCustomFlag, ClearCustomFlags, SetIntensity, GetIntensity','Flags and intensity.','Flag ve intensity.','Drive branches and layer rules.','Branch ve layer kurallarını sür.'],
 ['PlayStinger, GetAvailableStingerCueNames, StartDucking, StopDucking, SetDuckLayers, GetDuckLayers','Accents and ducking.','Vurgu ve ducking.','Handle moments and dialogue clarity.','Anlık olayları ve diyalog netliğini yönet.'],
 ['GetBpm, GetCurrentBar, GetCurrentBeat','Timing getters.','Zaman getterları.','Sync UI or gameplay to the musical grid.','UI veya gameplayi müzikal gride bağla.']
], 'tr')}`},

'glossary':{
en:`<p class="lead">Short definitions for the musical and runtime terms used across this guide.</p>${tbl(['Term','Meaning'],[
 ['State','A named musical mood such as Explore, Combat or Boss.'],
 ['Track','One song or cue inside a state. Several tracks make a playlist.'],
 ['Layer / Stem','Extra instrument audio that plays in sync with the track and fades in or out.'],
 ['Section','A musical block such as Intro, Loop, Bridge or Outro.'],
 ['Branch','A prioritized rule that routes one section to another when its conditions pass.'],
 ['Intensity','A 0-1 pressure value that drives layers through an intensity profile.'],
 ['Hysteresis','A gap between on and off thresholds so a layer does not flicker near one value.'],
 ['Stinger','A short one-shot musical accent played over the score.'],
 ['Ducking','Temporarily lowering the music for dialogue or important sound.'],
 ['Quantize','Waiting for a musical boundary (bar, section or exit) before acting.'],
 ['Valid exit','A bar or point where leaving a section sounds natural.'],
 ['Request','A prioritized, id-tagged demand for a state, resolved by arbitration.'],
 ['Track lock','Pinning the current track so the playlist will not auto-advance.']
])}`,
tr:`<p class="lead">Bu rehberde geçen müzikal ve runtime terimler için kısa tanımlar.</p>${tbl(['Terim','Anlam'],[
 ['State','Explore, Combat veya Boss gibi isimli müzikal mod.'],
 ['Track','Bir state içindeki bir şarkı veya cue. Birden çok track bir playlist yapar.'],
 ['Layer / Stem','Track ile senkron çalan, fade ile açılıp kapanan ekstra enstrüman sesi.'],
 ['Section','Intro, Loop, Bridge veya Outro gibi müzikal blok.'],
 ['Branch','Koşulları geçince bir sectionı başka bir sectiona yönlendiren önceliklendirilmiş kural.'],
 ['Intensity','Bir intensity profili üzerinden layerları süren 0-1 baskı değeri.'],
 ['Histerezis','Bir layerın tek değer etrafında titrememesi için açma ve kapama eşikleri arasındaki boşluk.'],
 ['Stinger','Skorun üstünde çalınan kısa tek seferlik müzikal vurgu.'],
 ['Ducking','Diyalog veya önemli ses için müziği geçici kısmak.'],
 ['Quantize','İşlem yapmadan önce bir müzikal sınırı (bar, section veya çıkış) beklemek.'],
 ['Geçerli çıkış','Bir sectiondan ayrılmanın doğal duyulduğu bar veya nokta.'],
 ['Request','Önceliklendirme ile çözülen, id etiketli, bir state için talep.'],
 ['Track lock','Playlistin auto-advance yapmaması için mevcut tracki sabitlemek.']
])}`},

'faq':{
en:`<p class="lead">Fast answers to the questions most people ask first.</p>${tbl(['Question','Answer'],[
 ['Do I need to write code?','No. Profiles, zones and the Control Panel can author and test behavior. Code only connects gameplay events.'],
 ['Do I need separated stems?','No. Start with full mixes and add stems later when you want vertical arrangement.'],
 ['Can I use a single song?','Yes. One state with one baseClip is a valid, working setup.'],
 ['Can I use multiple Conductors?','Use one active Conductor. Swap profiles or states instead of running two.'],
 ['Does it work in URP or HDRP?','Yes. Audio behavior is render-pipeline independent.'],
 ['Will changes always land on the beat?','Only if you ask for it. Quantized calls wait for the next bar or exit; immediate calls happen at once.']
])}`,
tr:`<p class="lead">İnsanların ilk sorduğu sorulara hızlı cevaplar.</p>${tbl(['Soru','Cevap'],[
 ['Kod yazmam gerekir mi?','Hayır. Profiller, bölgeler ve Kontrol Paneli davranışı kurup test edebilir. Kod yalnızca gameplay olaylarını bağlar.'],
 ['Ayrık stem gerekir mi?','Hayır. Full mix ile başla, dikey aranjman isteyince sonra stem ekle.'],
 ['Tek şarkı kullanabilir miyim?','Evet. Tek baseClipli tek state geçerli, çalışan bir kurulumdur.'],
 ['Birden çok Conductor kullanabilir miyim?','Tek aktif Conductor kullan. İki tane çalıştırmak yerine profil veya state değiştir.'],
 ['URP veya HDRP’de çalışır mı?','Evet. Ses davranışı render pipeline bağımsızdır.'],
 ['Değişiklikler her zaman vuruşa mı oturur?','Sadece istersen. Quantize çağrılar sonraki barı veya çıkışı bekler; anlık çağrılar hemen olur.']
])}`},

'support':{
en:`<p class="lead">When you need help, a little musical context goes a long way.</p>
<p>Email: <a href="mailto:nonfigurestudio@gmail.com">nonfigurestudio@gmail.com</a></p>
${call('tip','A useful report includes','Your Unity version, the shape of your active profile, the exact state, layer and section names, the conductor timing settings, any active zones or requests, and the Console output with debugLog enabled.')}
<h3>Publisher</h3>
<p>BeatSyncToolkit is created and published by <strong>Nonfigure Studio</strong>.</p>`,
tr:`<p class="lead">Yardım gerektiğinde biraz müzikal bağlam çok işe yarar.</p>
<p>E-posta: <a href="mailto:nonfigurestudio@gmail.com">nonfigurestudio@gmail.com</a></p>
${call('tip','Faydalı bir rapor şunları içerir','Unity sürümün, aktif profilinin yapısı, birebir state, layer ve section isimleri, conductor timing ayarları, varsa aktif bölge veya requestler ve debugLog açıkken Console çıktısı.')}
<h3>Yayıncı</h3>
<p>BeatSyncToolkit, <strong>Nonfigure Studio</strong> tarafından geliştirilip yayınlanmaktadır.</p>`},

'privacy':{
en:`<p class="lead">BeatSyncToolkit does not collect any data about you.</p>
<p>The runtime adds no analytics, telemetry, advertising, identifiers or network calls. Your project, your players and your audio never leave the machine because of this toolkit. This documentation runs fully offline and stores only your language and theme preference in your own browser; that preference is never transmitted anywhere.</p>
<p>If you obtained the asset through a storefront, that storefront handles your purchase and account under its own privacy policy.</p>`,
tr:`<p class="lead">BeatSyncToolkit hakkında hiçbir veri toplamaz.</p>
<p>Runtime hiçbir analitik, telemetri, reklam, tanımlayıcı veya ağ çağrısı eklemez. Projen, oyuncuların ve seslerin bu toolkit yüzünden makineden asla çıkmaz. Bu dokümantasyon tamamen çevrimdışı çalışır ve yalnızca dil ile tema tercihini kendi tarayıcında saklar; bu tercih hiçbir yere gönderilmez.</p>
<p>Asseti bir mağaza üzerinden edindiysen, o mağaza satın almanı ve hesabını kendi gizlilik politikasıyla yönetir.</p>`},

'terms':{
en:`<p class="lead">Use is governed by the license or EULA you obtained the asset under.</p>
<p>This page is a plain-language pointer, not the binding contract. The asset is licensed, not sold; you may use it in personal and commercial projects as that license permits. Do not redistribute or resell the source and assets as a standalone or competing product, and confirm the rights for any demo media before shipping it. The asset is provided as is, without warranty; test it in your own project.</p>`,
tr:`<p class="lead">Kullanım, asseti edindiğin lisans veya EULA tarafından yönetilir.</p>
<p>Bu sayfa bağlayıcı sözleşme değil, sade dilli bir yönlendirmedir. Asset lisanslanır, satılmaz; o lisansın izin verdiği ölçüde kişisel ve ticari projelerde kullanabilirsin. Kaynağı ve assetleri bağımsız ya da rakip bir ürün olarak yeniden dağıtma veya satma ve yayınlamadan önce her demo medyasının haklarını doğrula. Asset olduğu gibi, garantisiz sağlanır; kendi projende test et.</p>`}
};
