# -*- coding: utf-8 -*-
# Chaque entrée: E(n, groupe, titre, fr, c=compteur, w=moment, b=bienfait, v=[(recueil, numéro)], warn=avertissement, ar=arabe, tr=translit, ars=arabe soir, id=id)
ENT = []
def E(n, g, t, fr, c=1, w=None, b='', v=None, warn='', ar=None, tr=None, ars=None, id=None, note=''):
    ENT.append(dict(n=n, g=g, t=t, fr=fr, c=c, w=w, b=b, v=v or [], warn=warn, ar=ar, tr=tr, ars=ars, id=id, note=note))

IKHLAS_FR = ("Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux. Dis : « Il est Allah, Unique. Allah, le Seul à être imploré pour ce que nous désirons. "
 "Il n'a jamais engendré, et n'a pas été engendré. Et nul n'est égal à Lui. » "
 "Dis : « Je cherche refuge auprès du Seigneur de l'aube naissante, contre le mal des êtres qu'Il a créés, contre le mal de l'obscurité quand elle s'approfondit, "
 "contre le mal de celles qui soufflent sur les nœuds, et contre le mal de l'envieux quand il envie. » "
 "Dis : « Je cherche refuge auprès du Seigneur des hommes, le Souverain des hommes, le Dieu des hommes, contre le mal du tentateur furtif, "
 "qui souffle le mal dans les poitrines des hommes, qu'il soit djinn ou être humain. »")

# ---------------- MATIN ET SOIR ----------------
E('75','matin_soir',"Ayat al-Kursi (2:255)",
 "Allah ! Il n'y a de divinité digne d'adoration que Lui, le Vivant, Celui qui subsiste par Lui-même et soutient toute chose. Ni somnolence ni sommeil ne Le saisissent. À Lui appartient ce qui est dans les cieux et sur la terre. Qui peut intercéder auprès de Lui sans Sa permission ? Il connaît ce qui est devant eux et ce qui est derrière eux, et ils n'embrassent de Sa science que ce qu'Il veut. Son Trône s'étend sur les cieux et la terre, et leur garde ne Lui pèse point. Et Il est le Très-Haut, le Très-Grand.",
 c=1, w='matin-soir', b="Protection contre les djinns jusqu'au soir (lue le matin) ou jusqu'au matin (lue le soir).")
E('76','matin_soir',"Ikhlas, Falaq et Nas (3 sourates, 3 fois)", IKHLAS_FR, c=3, w='matin-soir',
 b="Elles te suffisent contre toute chose.", v=[('abudawud',5082),('tirmidhi',3575)])
E('77','matin_soir',"« Nous voici au matin (au soir), et la royauté appartient à Allah »",
 "Nous voici au matin et la royauté appartient à Allah. Louange à Allah. Il n'y a de divinité digne d'adoration qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose. Seigneur, je Te demande le bien de ce jour et le bien de ce qui vient après, et je me réfugie auprès de Toi contre le mal de ce jour et le mal de ce qui vient après. Seigneur, je me réfugie auprès de Toi contre la paresse et la mauvaise vieillesse. Seigneur, je me réfugie auprès de Toi contre un châtiment dans le Feu et un châtiment dans la tombe. (Le soir : « Nous voici au soir… », « le bien de cette nuit… ».)",
 c=1, w='matin-soir')
E('78','matin_soir',"« Ô Allah, c'est par Toi que nous atteignons le matin (le soir) »",
 "Ô Allah, c'est par Toi que nous atteignons le matin et par Toi que nous atteignons le soir ; par Toi nous vivons et par Toi nous mourons, et vers Toi est la résurrection. (Le soir : « …et vers Toi est le retour final ».)",
 c=1, w='matin-soir',
 ar="اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا، وَبِكَ نَحْـيا وَبِكَ نَمـوتُ وَإِلَـيْكَ النِّـشور",
 ars="اللهم بك أمسينا وبك أصبحنا، وبك نحيا وبك نموت، وإليك المصير")
E('79','matin_soir',"Sayyid al-istighfar (le maître des demandes de pardon)",
 "Ô Allah, Tu es mon Seigneur, il n'y a de divinité digne d'adoration que Toi. Tu m'as créé et je suis Ton serviteur, et je me tiens, autant que je le peux, à mon engagement et à Ta promesse envers Toi. Je me réfugie auprès de Toi contre le mal de ce que j'ai commis. Je reconnais Ton bienfait envers moi et je reconnais mon péché : pardonne-moi, car nul ne pardonne les péchés en dehors de Toi.",
 c=1, w='matin-soir', b="Celui qui le dit avec conviction le matin et meurt ce jour-là entre au Paradis ; de même pour le soir et la nuit.", v=[('bukhari',6306)])
E('80','matin_soir',"Prendre Allah et Ses anges à témoin",
 "Ô Allah, je suis au matin ; je Te prends à témoin, ainsi que les porteurs de Ton Trône, Tes anges et toute Ta création : Tu es Allah, il n'y a de divinité digne d'adoration que Toi, Seul, sans associé, et Muhammad est Ton serviteur et Ton messager. (Le soir : « Je suis au soir… ».)",
 c=4, w='matin-soir', b="Allah préserve du Feu celui qui le dit 4 fois, matin ou soir.", v=[('abudawud',None)],
 ar="اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك، وَمَلائِكَتِك، وَجَمـيعَ خَلْـقِك، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك، وَأَنَّ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك")
E('81','matin_soir',"Remercier Allah pour Ses bienfaits du jour",
 "Ô Allah, tout bienfait dont je jouis ce matin, ou dont jouit l'une de Tes créatures, vient de Toi seul, sans associé. À Toi la louange et à Toi la reconnaissance. (Le soir : « …ce soir… ».)",
 c=1, w='matin-soir', b="Celui qui le dit s'acquitte de sa gratitude pour ce jour (ou pour cette nuit).")
E('82','matin_soir',"Demander la santé du corps, de l'ouïe et de la vue",
 "Ô Allah, accorde-moi la santé dans mon corps. Ô Allah, accorde-moi la santé dans mon ouïe. Ô Allah, accorde-moi la santé dans ma vue. Il n'y a de divinité digne d'adoration que Toi. Ô Allah, je me réfugie auprès de Toi contre la mécréance et la pauvreté, et je me réfugie auprès de Toi contre le châtiment de la tombe. Il n'y a de divinité digne d'adoration que Toi.",
 c=3, w='matin-soir', v=[('abudawud',5090)],
 warn="Chaîne jugée hasan par Al-Albani et Ibn Baz ; d'autres spécialistes (ex. Zubayr 'Ali Za'i) la jugent faible.")
E('83','matin_soir',"« Allah me suffit » (Hasbiyallah)",
 "Allah me suffit. Il n'y a de divinité digne d'adoration que Lui. En Lui je place ma confiance, et Il est le Seigneur du Trône immense.",
 c=7, w='matin-soir', v=[('abudawud',5081)],
 warn="Rapporté par Abu Dawud comme parole du Compagnon Abu ad-Darda' (non comme parole du Prophète ﷺ) : Hisn al-Muslim l'attribue au Prophète, ce qui est contesté. La promesse de récompense précise est discutée.")
E('84','matin_soir',"Demander le pardon et le bien-être (al-'afw wal-'afiya)",
 "Ô Allah, je Te demande le pardon et le bien-être en ce monde et dans l'au-delà. Ô Allah, je Te demande le pardon et le bien-être dans ma religion, ma vie d'ici-bas, ma famille et mes biens. Ô Allah, cache mes défauts et apaise mes frayeurs. Ô Allah, protège-moi par devant et par derrière, à ma droite et à ma gauche, et par au-dessus de moi ; et je me réfugie dans Ta grandeur contre le fait d'être englouti par-dessous.",
 c=1, w='matin-soir', v=[('ibnmajah',3871),('abudawud',5074)])
E('85','matin_soir',"« Ô Allah, Créateur des cieux et de la terre, Connaisseur de l'invisible »",
 "Ô Allah, Connaisseur de l'invisible et du visible, Créateur des cieux et de la terre, Seigneur de toute chose et son Maître, je témoigne qu'il n'y a de divinité digne d'adoration que Toi. Je me réfugie auprès de Toi contre le mal de mon âme, contre le mal du Diable et de son polythéisme, et contre le fait de commettre une faute contre moi-même ou de l'entraîner vers un musulman.",
 c=1, w='matin-soir', v=[('abudawud',5067),('tirmidhi',3392)], b="Enseigné par le Prophète ﷺ à Abu Bakr pour le matin, le soir et le coucher.")
E('86','matin_soir',"Bismillahi alladhi la yadurru ma'a-smihi",
 "Au nom d'Allah, avec le nom de Qui rien sur la terre ni dans le ciel ne peut nuire, et Il est l'Audient, l'Omniscient.",
 c=3, w='matin-soir', b="Celui qui le dit 3 fois le matin ne sera pas touché par un malheur subit avant le soir ; le soir, pas avant le matin.", v=[('abudawud',5088),('tirmidhi',3388)])
E('87','matin_soir',"Satisfait d'Allah comme Seigneur",
 "Je suis satisfait d'Allah comme Seigneur, de l'Islam comme religion et de Muhammad ﷺ comme prophète.",
 c=3, w='matin-soir', b="Allah a promis de satisfaire, au Jour de la Résurrection, celui qui le dit 3 fois matin et soir.")
E('88','matin_soir',"« Ô Vivant, ô Subsistant, par Ta miséricorde je cherche secours »",
 "Ô Vivant, ô Celui qui subsiste par Lui-même, par Ta miséricorde je demande secours : améliore toute ma situation et ne me confie pas à moi-même, ne serait-ce que le temps d'un clin d'œil.",
 c=1, w='matin-soir')
E('89','matin_soir',"Demander le bien de cette journée (de cette nuit)",
 "Nous voici au matin et la royauté appartient à Allah, Seigneur des mondes. Ô Allah, je Te demande le bien de ce jour : sa victoire, son secours, sa lumière, sa bénédiction et sa guidance ; et je me réfugie auprès de Toi contre le mal qu'il contient et le mal de ce qui vient après.",
 c=1, w='matin-soir', ars=None)
E('90','matin_soir',"« Nous voici au matin (au soir) sur la fitra de l'Islam »",
 "Nous voici au matin sur la nature originelle de l'Islam, sur la parole de la sincérité, sur la religion de notre Prophète Muhammad ﷺ et sur la voie de notre père Ibrahim, qui était droit, soumis à Allah, et n'était pas du nombre des polythéistes. (Le soir : « Nous voici au soir… ».)",
 c=1, w='matin-soir')
E('91','matin_soir',"Subhanallahi wa bihamdihi (100 fois)",
 "Gloire et louange à Allah.", c=100, w='matin-soir',
 b="Nul ne viendra au Jour de la Résurrection avec mieux, sauf celui qui en aura dit autant ou plus.", v=[('muslim',2692)])
E('92','matin_soir',"Tahlil : « Lâ ilâha illallâh wahdahu… » (10 fois)",
 "Il n'y a de divinité digne d'adoration qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose.",
 c=10, w='matin-soir', b="Dix bonnes actions écrites, dix mauvaises effacées, la récompense de dix esclaves affranchis, et protection contre le Diable (An-Nasa'i, 'Amal al-yawm wal-layla n°24).")
E('93','matin_soir',"Tahlil : « Lâ ilâha illallâh… » (100 fois par jour)",
 "Il n'y a de divinité digne d'adoration qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose.",
 c=100, w='matin', b="Récompense de dix esclaves affranchis, cent bonnes actions écrites, cent mauvaises effacées, et protection contre le Diable jusqu'au soir.", v=[('bukhari',3293),('muslim',2691)])
E('94','matin_soir',"Subhanallahi wa bihamdihi 'adada khalqihi…",
 "Gloire et louange à Allah, autant que le nombre de Sa création, autant que Son agrément, autant que le poids de Son Trône et autant que l'encre de Ses paroles.",
 c=3, w='matin', v=[('muslim',2726)], b="Dit trois fois par le Prophète ﷺ après le Fajr ; il a dit que ces paroles pèsent plus que ce que Juwayriya avait récité depuis le matin.")
E('95','matin_soir',"Demander une science utile, une bonne subsistance et des œuvres agréées",
 "Ô Allah, je Te demande une science utile, une subsistance pure et des œuvres agréées.",
 c=1, w='matin', note="À dire après la prière de l'aube (Fajr).")
E('96','matin_soir',"Astaghfirullâha wa atûbu ilayh (100 fois par jour)",
 "Je demande pardon à Allah et je me repens à Lui.", c=100, w=None, v=[('muslim',2702)])
E('97','matin_soir',"Se réfugier dans les paroles parfaites d'Allah (le soir)",
 "Je me réfugie dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé.", c=3, w='soir',
 b="Protège des piqûres et morsures venimeuses cette nuit-là.")
E('98','matin_soir',"Prière sur le Prophète ﷺ (10 fois)",
 "Ô Allah, prie sur notre Prophète Muhammad et salue-le.", c=10, w='matin-soir',
 b="Promesse de l'intercession du Prophète ﷺ au Jour de la Résurrection (rapporté par At-Tabarani, avec une chaîne jugée correcte).")
